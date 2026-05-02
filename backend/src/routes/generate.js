import express from 'express';
import Groq from 'groq-sdk';
import { z } from 'zod';

const router = express.Router();

// Validation Schema: Ensure incoming data is clean and complete
const incidentSchema = z.object({
  what: z.string()
    .min(10, 'Incident description must be at least 10 characters')
    .max(5000, 'Incident description is too long'),
  when: z.string()
    .min(1, 'Incident time is required'),
  duration: z.string()
    .min(1, 'Duration is required')
    .max(100, 'Duration is too long'),
  severity: z.enum(['SEV-1', 'SEV-2', 'SEV-3', 'SEV-4'])
    .optional()
    .default('SEV-3'),
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
 */
router.post('/', async (req, res) => {
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
      severity: validatedData.severity,
    });

    // Initialize Groq client
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    // Construct comprehensive prompt
    const prompt = `You are a Senior Site Reliability Engineer. Generate a professional incident postmortem report in markdown format.

**Incident Details:**
- Severity: ${validatedData.severity}
- Occurrence: ${validatedData.when}
- Duration: ${validatedData.duration}
- Impact: ${validatedData.impact}
- What Happened: ${validatedData.what}
- Resolution: ${validatedData.resolution}

**Required Sections:**
1. Executive Summary (2-3 sentences)
2. Incident Timeline (chronological with timestamps)
3. Root Cause Analysis (5 Whys methodology)
4. Impact Assessment (business and technical)
5. Resolution Steps (what was done)
6. Action Items (with priorities: High/Medium/Low)
7. Lessons Learned (3-5 actionable insights)

Format with clear markdown headers (##), bullet points, and professional technical language suitable for SRE/DevOps teams.`;

    // Call Groq API with Llama model
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192', // Fast and free-tier friendly
      temperature: 0.7,
      max_tokens: 2048,
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
      model: 'llama3-8b-8192'
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
