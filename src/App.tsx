import { useState } from 'react';
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
      // Get backend URL from environment
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

      console.log('📝 Sending request to backend...');

      // Call backend API
      const response = await fetch(`${backendUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          what: formData.whatHappened,
          when: formData.occurrence,
          duration: formData.duration,
          impact: formData.impact,
          resolution: formData.resolution,
          severity: formData.severity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.markdown) {
        throw new Error('No content received from API');
      }

      console.log('✅ Postmortem generated successfully');
      setContent(data.markdown);
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
