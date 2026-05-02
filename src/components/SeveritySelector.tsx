import { SeverityLevel } from '../types';

interface SeveritySelectorProps {
  selected: SeverityLevel;
  onChange: (severity: SeverityLevel) => void;
}

const severityOptions: { value: SeverityLevel; label: string; className: string }[] = [
  { value: 'SEV-1', label: 'SEV-1 Critical', className: 'sev-1' },
  { value: 'SEV-2', label: 'SEV-2 High', className: 'sev-2' },
  { value: 'SEV-3', label: 'SEV-3 Medium', className: 'sev-3' },
  { value: 'SEV-4', label: 'SEV-4 Low', className: 'sev-4' },
];

export default function SeveritySelector({ selected, onChange }: SeveritySelectorProps) {
  return (
    <div className="severity-selector">
      {severityOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`severity-btn ${option.className} ${selected === option.value ? 'selected' : ''}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
