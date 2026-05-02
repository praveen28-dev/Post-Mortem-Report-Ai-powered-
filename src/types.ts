export type SeverityLevel = 'SEV-1' | 'SEV-2' | 'SEV-3' | 'SEV-4';

export interface IncidentFormData {
  occurrence: string;
  duration: string;
  severity: SeverityLevel;
  impact: string;
  whatHappened: string;
  resolution: string;
}

export interface PostMortemResponse {
  markdown: string;
  generatedAt: string;
  model: string;
}
