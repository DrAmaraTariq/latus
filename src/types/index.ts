export type RiskLevel = "high-risk" | "needs-review" | "stable" | "follow-up-due";

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: "Female" | "Male";
  mrn: string;
  risk: RiskLevel;
  healthScore?: number;
  avatarColor: string;
  lastConsultation?: string;
  nextAppointment?: string;
  flag?: string; // e.g. "Activity ↓ 34%"
}

export interface Appointment {
  id: string;
  time: string;
  patientId: string;
  patientName: string;
  type: string;
  modality: "Video consultation" | "In-person";
  risk: RiskLevel;
  status?: "upcoming" | "completed";
}

export interface ActivityFeedItem {
  id: string;
  patientId: string;
  patientName: string;
  text: string;
  time: string;
}

export type Severity = "critical" | "warning" | "info";

export interface SafetyItem {
  id: string;
  label: string;
  severity: Severity;
}

export interface VitalMetric {
  id: string;
  label: string;
  value: string;
  unit?: string;
  trend?: "up" | "down" | "flat";
  trendGood?: boolean;
  timestamp?: string;
  note?: string;
}

export interface EvidenceSource {
  label: string;
  icon?: string;
}

export interface Evidence {
  title: string;
  description: string;
  source: string;
  sourceIcon: string;
  detectedAt: string;
  baseline?: string;
  current?: string;
  confidence: number;
  sources: string[];
  chartData?: { day: string; value: number }[];
}

export interface AIFinding {
  id: string;
  text: string;
}

export interface ClinicalSummary {
  findings: AIFinding[];
  confidence: number;
  basedOn: string[];
}

export interface Concern {
  id: string;
  severity: "critical" | "warning";
  title: string;
  source: string;
  detectedAt: string;
  compareText?: string;
  acknowledged: boolean;
  evidenceKey: string;
}

export interface AISuggestion {
  id: string;
  text: string;
  evidenceKey: string;
}

export interface PlanItem {
  id: string;
  text: string;
  done: boolean;
}

export interface ChangeItem {
  id: string;
  label: string;
  value: string;
  direction: "down" | "up" | "flat" | "new";
  period: "7D" | "14D" | "30D" | "1Y";
}

export interface Finding {
  id: string;
  label: string;
  direction: "down" | "up";
  source: string;
  timestamp: string;
  trend: { day: string; value: number }[];
}

export interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  adherence: number;
  startDate: string;
}

export interface TimelineEvent {
  id: string;
  when: string;
  title: string;
  detail?: string;
}

export interface TrendSeries {
  id: string;
  label: string;
  unit: string;
  source: string;
  data: { day: string; value: number }[];
}

export interface DoctorNote {
  id: string;
  category: "Recommendations" | "Follow-up Instructions" | "Lifestyle Guidance" | "Patient Comments";
  text: string;
  author: string;
  time: string;
}

export interface Message {
  id: string;
  from: string;
  preview: string;
  time: string;
  unread: boolean;
}
