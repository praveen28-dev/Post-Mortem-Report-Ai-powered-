import { useState } from 'react';
import Anthropic from '@anthropic-ai/sdk';
import Header from './components/Header';
import FormSection from './components/FormSection';
import OutputArea from './components/OutputArea';
import StatusBar from './components/StatusBar';
import { IncidentFormData } from './types';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePostMortem = async (formData: IncidentFormData) => {
    setIsLoading(true);
    setError(null);
    setContent(null);

    try {
      // Validate API key
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey || apiKey === 'your_anthropic_api_key_here') {
        throw new Error('Anthropic API key not configured. Please add VITE_ANTHROPIC_API_KEY to your .env file.');
      }

      // Initialize Anthropic client
      const anthropic = new Anthropic({
        apiKey,
        dangerouslyAllowBrowser: true, // Frontend-only architecture
      });

      // Construct prompt
      const prompt = `Generate a professional incident postmortem report in markdown format with these details:

Severity: ${formData.severity}
Occurrence Time: ${formData.occurrence}
Duration: ${formData.duration}
Impact: ${formData.impact}
What Happened: ${formData.whatHappened}
Resolution Steps: ${formData.resolution}

Include sections: Executive Summary, Timeline, Root Cause Analysis, Impact Summary, Resolution, Action Items (with owners and deadlines), and Lessons Learned. Keep it concise, professional, and suitable for SRE/DevOps teams. Format with clear markdown headers.`;

      console.log('📝 Generating postmortem with Claude...');

      // Call Anthropic API
      const message = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // Extract text content
      const textContent = message.content
        .filter((block) => block.type === 'text')
        .map((block) => ('text' in block ? block.text : ''))
        .join('\n');

      if (!textContent) {
        throw new Error('No content received from API');
      }

      console.log('✅ Postmortem generated successfully');
      setContent(textContent);
    } catch (err) {
      console.error('❌ Error generating postmortem:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate postmortem';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="root">
      <div className="app-container">
        <Header />
        <FormSection onSubmit={generatePostMortem} isLoading={isLoading} />
        <OutputArea isLoading={isLoading} content={content} error={error} />
      </div>
      <StatusBar />
    </div>
  );
}

export default App;
