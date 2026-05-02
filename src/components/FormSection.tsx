import { useState } from 'react';
import { IncidentFormData } from '../types';
import SeveritySelector from './SeveritySelector';
import ProTip from './ProTip';

interface FormSectionProps {
  onSubmit: (data: IncidentFormData) => void;
  isLoading: boolean;
}

export default function FormSection({ onSubmit, isLoading }: FormSectionProps) {
  const [formData, setFormData] = useState<IncidentFormData>({
    occurrence: '',
    duration: '',
    severity: 'SEV-3',
    impact: '',
    whatHappened: '',
    resolution: '',
  });

  const [errors, setErrors] = useState<{ whatHappened?: boolean; impact?: boolean }>({});

  const handleChange = (field: keyof IncidentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as 'whatHappened' | 'impact']) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if both whatHappened and impact are empty
    if (!formData.whatHappened.trim() && !formData.impact.trim()) {
      setErrors({ whatHappened: true, impact: true });
      
      // Flash red border for 2 seconds
      setTimeout(() => {
        setErrors({});
      }, 2000);
      
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="form-body">
      {/* Section 1: Incident Timing */}
      <div className="form-section">
        <label className="section-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          Incident Timing
        </label>
        <div className="input-grid">
          <div className="input-wrapper">
            <span className="input-label">Occurrence</span>
            <input
              type="datetime-local"
              value={formData.occurrence}
              onChange={(e) => handleChange('occurrence', e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <span className="input-label">Duration</span>
            <input
              type="text"
              placeholder="e.g., 45 minutes"
              value={formData.duration}
              onChange={(e) => handleChange('duration', e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Section 2: Severity & Impact */}
      <div className="form-section">
        <label className="section-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Severity & Impact
        </label>
        <SeveritySelector
          selected={formData.severity}
          onChange={(severity) => handleChange('severity', severity)}
        />
        <textarea
          placeholder="Who/what was affected? (e.g., 30% of users couldn't complete checkout)"
          value={formData.impact}
          onChange={(e) => handleChange('impact', e.target.value)}
          rows={3}
          className={errors.impact ? 'error-flash' : ''}
          required
        />
      </div>

      {/* Pro Tip Banner */}
      <ProTip />

      {/* Section 3: Incident Description */}
      <div className="form-section">
        <label className="section-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          What Happened?
        </label>
        <textarea
          placeholder="Describe the incident... (e.g., API gateway returned 503 errors for 45 minutes starting at 14:32 UTC)"
          value={formData.whatHappened}
          onChange={(e) => handleChange('whatHappened', e.target.value)}
          rows={3}
          className={errors.whatHappened ? 'error-flash' : ''}
          required
        />
      </div>

      {/* Section 4: Resolution Steps */}
      <div className="form-section">
        <label className="section-label">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Resolution Steps
        </label>
        <textarea
          placeholder="Steps taken to resolve... (e.g., Identified memory leak in v2.3.1, restarted pods, scaled replicas from 3 to 5)"
          value={formData.resolution}
          onChange={(e) => handleChange('resolution', e.target.value)}
          rows={3}
          required
        />
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Generate Button */}
      <button type="submit" className="generate-btn" disabled={isLoading}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        {isLoading ? 'GENERATING...' : 'GENERATE POSTMORTEM'}
      </button>
    </form>
  );
}
