import express from 'express';
import Groq from 'groq-sdk';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

const router = express.Router();

// 1. Rate Limiting: Prevent API abuse
// Default: 10 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10,
  message: { 
    error: 'Too many postmortem generation requests. Please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
});

// 2. Validation Schema: Ensure incoming data is clean and complete
const incidentSchema = z.object({
  what: z.string()
    .min(10, 'Incident description must be at least 10 characters')
    .max(5000, 'Incident description is too long'),
  when: z.string()
    .min(1, 'Incident time is required'),
  duration: z.string()
    .min(1, 'Duration is required')
    .max(100, 'Duration is too long'),
  impact: z.string()
    .min(10, 'Impact description must be at least 10 characters')
    .max(5000, 'Impact description is too long'),
  resolution: z.string()
    .min(10, 'Resolution description must be at least 10 characters')
    .max(5000, 'Resolution description is too long'),
});

/**
 * POST /api/generate
 * Generate a postmortem document from incident data using Groq AI
 * 
 * Security Features:
 * - Rate limited to prevent abuse
 * - Input validation with Zod
 * - API key never exposed to client
 * - Sanitized error messages
 */
router.post('/', limiter, async (req, res) => {
  try {
    // Validate API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error('❌ GROQ_API_KEY not configured');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }

    // Validate input data
    const validatedData = incidentSchema.parse(req.body);

    console.log('📝 Generating postmortem for incident:', {
      what: validatedData.what.substring(0, 50) + '...',
      when: validatedData.when,
    });

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    // Construct comprehensive prompt with system instructions
    const systemPrompt = `You are a Senior Site Reliability Engineer with extensive experience in incident management and postmortem documentation. Your task is to analyze incident data and generate a professional, high-fidelity Markdown postmortem document.

Your postmortem MUST include the following sections:

# Executive Summary
A concise overview (2-3 sentences) of what happened, the impact, and the resolution.

# Incident Details
- **Date & Time:** [from incident data]
- **Duration:** [from incident data]
- **Status:** Resolved

# Incident Timeline
A detailed chronological breakdown of events from detection to resolution. Use bullet points with timestamps.

# Root Cause Analysis (5 Whys)
Apply the 5 Whys methodology to drill down to the fundamental cause:
- **Why 1:** [First level cause]
- **Why 2:** [Deeper cause]
- **Why 3:** [Even deeper]
- **Why 4:** [Getting to root]
- **Why 5:** [Root cause identified]

# Impact Assessment
Describe the business and technical impact in detail.

# Resolution
Explain how the incident was resolved and what immediate actions were taken.

# Lessons Learned
Provide 3-5 actionable insights gained from this incident.

# Action Items
List specific, actionable follow-up tasks with suggested priorities (High/Medium/Low).

Format the output in clean, professional Markdown with proper headers (##), bullet points, and emphasis where appropriate. Be thorough but concise. Use technical language appropriate for an engineering audience.`;

    const userPrompt = `Please analyze this incident and create a professional postmortem document:

**What Happened:**
${validatedData.what}

**When:**
${validatedData.when}

**Duration:**
${validatedData.duration}

**Impact:**
${validatedData.impact}

**Resolution:**
${validatedData.resolution}`;

    // Call Groq API with Llama model
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: systemPrompt
        },
        {
          role: 'user',
          content: userPrompt
        }
      ],
      model: 'llama-3.3-70b-versatile', // Fast and high-quality model
      temperature: 0.7,
      max_tokens: 4096,
      top_p: 0.95,
    });

    const text = chatCompletion.choices[0]?.message?.content;

    if (!text) {
      throw new Error('No text content in response');
    }

    console.log('✅ Postmortem generated successfully');

    // Return the generated markdown
    res.json({ 
      markdown: text,
      generatedAt: new Date().toISOString(),
      model: 'llama-3.3-70b-versatile'
    });

  } catch (error) {
    console.error('❌ Error generating postmortem:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Invalid incident data provided.',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      });
    }

    // Handle Groq API errors
    if (error.status === 401) {
      console.error('❌ Invalid Groq API key');
      return res.status(500).json({ 
        error: 'Server configuration error. Please contact support.' 
      });
    }

    if (error.status === 429) {
      return res.status(429).json({ 
        error: 'API rate limit exceeded. Please try again later.' 
      });
    }

    // Generic error response (don't leak internal details)
    res.status(500).json({ 
      error: 'Failed to generate postmortem. Please try again.' 
    });
  }
});

export default router;
