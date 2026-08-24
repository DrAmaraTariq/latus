import type {
  SafetyItem,
  VitalMetric,
  ClinicalSummary,
  Concern,
  AISuggestion,
  PlanItem,
  ChangeItem,
  Finding,
  Medication,
  TimelineEvent,
  TrendSeries,
  DoctorNote,
  Evidence,
} from "../types";

export interface PatientRecord {
  id: string;
  name: string;
  age: number;
  sex: string;
  mrn: string;
  risk: "stable" | "warning" | "critical";
  healthScore: number;
  avatarColor: string;
  lastConsultation: string;
  nextAppointment: string;
  flag?: string;
  reasonForVisit: string;
  safetyItems: SafetyItem[];
  snapshotMetrics: VitalMetric[];
  clinicalSummary: ClinicalSummary;
  evidenceLibrary: Record<string, Evidence>;
  concerns: Concern[];
  aiSuggestions: AISuggestion[];
  initialPlan: PlanItem[];
  changesByPeriod: Record<string, ChangeItem[]>;
  keyFindings: Finding[];
  trendSeries: TrendSeries[];
  medications: Medication[];
  timeline: TimelineEvent[];
  doctorNotes: DoctorNote[];
  soapNoteDraft: string;
}

export const johnPatientData: PatientRecord = {
  // Base Profile Info
  id: "john-smith",
  name: "John Smith",
  age: 46,
  sex: "Male",
  mrn: "LT-61482",
  risk: "stable",
  healthScore: 78,
  avatarColor: "#355E3B",
  lastConsultation: "22 days ago",
  nextAppointment: "Today • 10:30 AM",
  flag: "New symptom reported",

  // Clinical Telemetry & Details
  reasonForVisit:
    "Routine quarterly wellness check-in, review of hypertension management, and evaluation of baseline wearable telemetry data.",
  
  safetyItems: [
    { id: "s1", label: "No Known Drug Allergies (NKDA)"},
    { id: "s2", label: "Mild Shellfish Sensitivity", severity: "info" },
  ],

  snapshotMetrics: [
    { id: "m1", label: "Heart Rate", value: "68", unit: "bpm", trend: "flat", trendGood: true, timestamp: "Today • 08:15" },
    { id: "m2", label: "Oxygen Saturation", value: "98", unit: "%", trend: "flat", trendGood: true, timestamp: "Today • 09:10" },
    { id: "m3", label: "Respiratory Rate", value: "14", unit: "br/min", trend: "flat", timestamp: "Today • 08:15" },
    { id: "m4", label: "Sleep Quality", value: "85", unit: "/100", trend: "up", trendGood: true, timestamp: "Last night" },
    { id: "m5", label: "Daily Activity", value: "8,450", unit: "steps", trend: "up", trendGood: true, timestamp: "Today" },
    { id: "m6", label: "Walking Distance", value: "3.9", unit: "mi", trend: "up", trendGood: true, timestamp: "Today" },
    { id: "m7", label: "Recovery Score", value: "88", unit: "/100", trend: "up", trendGood: true, timestamp: "Today" },
    { id: "m8", label: "Medication Adherence", value: "98", unit: "%", trend: "flat", trendGood: true, timestamp: "Last 7 days" },
    { id: "m9", label: "Reported Symptoms", value: "0 active", trend: "flat", trendGood: true, timestamp: "Today" },
    {
      id: "m10",
      label: "Patient-Reported Blood Pressure",
      value: "122/80",
      unit: "mmHg",
      trendGood: true,
      timestamp: "Reported today • 07:30",
      note: "Patient-reported home cuff measurement",
    },
  ],

  clinicalSummary: {
    findings: [
      { id: "f1", text: "Daily activity levels maintained above target 8,000 steps." },
      { id: "f2", text: "Optimal sleep efficiency and steady cardiovascular telemetry." },
      { id: "f3", text: "Medication adherence remains excellent at 98%." },
    ],
    confidence: 96,
    basedOn: ["Wearables", "Medications", "Home Cuff Reports"],
  },

  evidenceLibrary: {
    "activity-stable": {
      title: "Consistent Physical Activity",
      description: "Daily step count meets target thresholds regularly.",
      source: "Apple Watch",
      sourceIcon: "⌚",
      detectedAt: "Today • 09:10",
      baseline: "8,000 steps/day",
      current: "8,450 steps/day",
      confidence: 95,
      sources: ["Wearable data", "Historical baseline"],
      chartData: [
        { day: "D1", value: 8100 },
        { day: "D4", value: 8300 },
        { day: "D7", value: 8250 },
        { day: "D10", value: 8400 },
        { day: "D13", value: 8500 },
        { day: "D14", value: 8450 },
      ],
    },
    "bp-control": {
      title: "Normotensive Home Blood Pressure",
      description: "Average readings over 14 days demonstrate optimal hypertension control.",
      source: "Patient Report",
      sourceIcon: "🩺",
      detectedAt: "Today • 07:30",
      baseline: "120/80 mmHg",
      current: "122/80 mmHg",
      confidence: 94,
      sources: ["Home Blood Pressure Log"],
    },
  },

  concerns: [],

  aiSuggestions: [
    { id: "sg1", text: "Maintain current treatment regimen", evidenceKey: "bp-control" },
    { id: "sg2", text: "Encourage continuation of baseline physical activity", evidenceKey: "activity-stable" },
  ],

  initialPlan: [
    { id: "p1", text: "Continue Lisinopril 10mg daily", done: true },
    { id: "p2", text: "Routine lab panel in 6 months", done: false },
    { id: "p3", text: "Maintain current exercise routine", done: true },
  ],

  changesByPeriod: {
    "7D": [
      { id: "ch1", label: "Activity", value: "↑ 3%", direction: "up", period: "7D" },
      { id: "ch2", label: "Sleep", value: "↑ 4%", direction: "up", period: "7D" },
      { id: "ch3", label: "Recovery Score", value: "↑ 2%", direction: "up", period: "7D" },
      { id: "ch4", label: "Medication Adherence", value: "100%", direction: "flat", period: "7D" },
    ],
    "14D": [
      { id: "ch1", label: "Activity", value: "↑ 5%", direction: "up", period: "14D" },
      { id: "ch2", label: "Sleep", value: "↑ 6%", direction: "up", period: "14D" },
      { id: "ch3", label: "Recovery Score", value: "↑ 4%", direction: "up", period: "14D" },
      { id: "ch4", label: "Medication Adherence", value: "98%", direction: "flat", period: "14D" },
    ],
    "30D": [
      { id: "ch1", label: "Activity", value: "↑ 2%", direction: "up", period: "30D" },
      { id: "ch2", label: "Sleep", value: "Stable", direction: "flat", period: "30D" },
      { id: "ch3", label: "Recovery Score", value: "↑ 3%", direction: "up", period: "30D" },
      { id: "ch4", label: "Medication Adherence", value: "97%", direction: "flat", period: "30D" },
    ],
    "1Y": [
      { id: "ch1", label: "Activity", value: "↑ 8%", direction: "up", period: "1Y" },
      { id: "ch2", label: "Sleep", value: "↑ 5%", direction: "up", period: "1Y" },
      { id: "ch3", label: "Recovery Score", value: "↑ 6%", direction: "up", period: "1Y" },
      { id: "ch4", label: "Medication Adherence", value: "96%", direction: "flat", period: "1Y" },
    ],
  },

  keyFindings: [
    {
      id: "kf1",
      label: "Resting Heart Rate (Stable)",
<<<<<<< HEAD
      direction: "up",
=======
>>>>>>> 1c1394279aa7a1427a461ab7037a1b210d9f3f24
      source: "Apple Watch",
      timestamp: "Today • 08:15",
      trend: [
        { day: "D1", value: 67 },
        { day: "D5", value: 68 },
        { day: "D9", value: 67 },
        { day: "D14", value: 68 },
      ],
    },
    {
      id: "kf2",
      label: "Recovery Score High",
      direction: "up",
      source: "Apple Watch",
      timestamp: "Today • 06:00",
      trend: [
        { day: "D1", value: 84 },
        { day: "D5", value: 85 },
        { day: "D9", value: 86 },
        { day: "D14", value: 88 },
      ],
    },
    {
      id: "kf3",
      label: "Sleep Quality Optimal",
      direction: "up",
      source: "Apple Watch",
      timestamp: "Last night",
      trend: [
        { day: "D1", value: 81 },
        { day: "D4", value: 82 },
        { day: "D7", value: 84 },
        { day: "D10", value: 83 },
        { day: "D14", value: 85 },
      ],
    },
  ],

  trendSeries: [
    {
      id: "hr",
      label: "Heart Rate",
      unit: "bpm",
      source: "Apple Watch",
      data: [
        { day: "D1", value: 67 }, { day: "D2", value: 68 }, { day: "D3", value: 67 },
        { day: "D4", value: 68 }, { day: "D5", value: 67 }, { day: "D6", value: 68 },
        { day: "D7", value: 68 }, { day: "D8", value: 67 }, { day: "D9", value: 68 },
        { day: "D10", value: 67 }, { day: "D11", value: 68 }, { day: "D12", value: 67 },
        { day: "D13", value: 68 }, { day: "D14", value: 68 },
      ],
    },
    {
      id: "spo2",
      label: "Oxygen Saturation",
      unit: "%",
      source: "Apple Watch",
      data: [
        { day: "D1", value: 98 }, { day: "D2", value: 98 }, { day: "D3", value: 98 },
        { day: "D4", value: 99 }, { day: "D5", value: 98 }, { day: "D6", value: 98 },
        { day: "D7", value: 98 }, { day: "D8", value: 98 }, { day: "D9", value: 99 },
        { day: "D10", value: 98 }, { day: "D11", value: 98 }, { day: "D12", value: 98 },
        { day: "D13", value: 98 }, { day: "D14", value: 98 },
      ],
    },
    {
      id: "sleep",
      label: "Sleep",
      unit: "/100",
      source: "Apple Watch",
      data: [
        { day: "D1", value: 81 }, { day: "D2", value: 82 }, { day: "D3", value: 80 },
        { day: "D4", value: 82 }, { day: "D5", value: 83 }, { day: "D6", value: 84 },
        { day: "D7", value: 84 }, { day: "D8", value: 83 }, { day: "D9", value: 85 },
        { day: "D10", value: 84 }, { day: "D11", value: 85 }, { day: "D12", value: 84 },
        { day: "D13", value: 85 }, { day: "D14", value: 85 },
      ],
    },
    {
      id: "activity",
      label: "Activity",
      unit: "steps",
      source: "Apple Watch",
      data: [
        { day: "D1", value: 8100 }, { day: "D2", value: 8200 }, { day: "D3", value: 8150 },
        { day: "D4", value: 8300 }, { day: "D5", value: 8250 }, { day: "D6", value: 8400 },
        { day: "D7", value: 8350 }, { day: "D8", value: 8400 }, { day: "D9", value: 8450 },
        { day: "D10", value: 8500 }, { day: "D11", value: 8400 }, { day: "D12", value: 8500 },
        { day: "D13", value: 8450 }, { day: "D14", value: 8450 },
      ],
    },
  ],

  medications: [
    { id: "med1", name: "Lisinopril", dose: "10 mg", frequency: "Once daily", adherence: 98, startDate: "Jan 10, 2024" },
  ],

  timeline: [
    { id: "t1", when: "Today", title: "Routine Check-in Completed", detail: "Vitals stable, telemetry consistent with baseline." },
    { id: "t2", when: "14 Days Ago", title: "Prescription Refilled", detail: "Lisinopril 10 mg refilled at local pharmacy." },
    { id: "t3", when: "90 Days Ago", title: "Quarterly Review", detail: "Blood pressure well controlled; encouraged ongoing physical activity." },
  ],

  doctorNotes: [
    { id: "n1", category: "Recommendations", text: "Continue current wellness plan and daily walking.", author: "Dr. Patel", time: "90 days ago" },
    { id: "n2", category: "Follow-up Instructions", text: "Recheck blood pressure log at next quarterly visit.", author: "Dr. Patel", time: "90 days ago" },
  ],

  soapNoteDraft: `S: Patient presents for routine quarterly check-in. Reports feeling well with no shortness of breath, fatigue, or chest pain. Sleep quality is consistent and physical activity remains high.

O: HR 68 bpm, SpO2 98%, BP 122/80 mmHg. Wearable telemetry shows steady physical activity averaging ~8,400 steps/day with a recovery score of 88/100.

A: Hypertension is well-controlled on current medication. No acute clinical concerns or physiological deterioration noted.

P: Continue Lisinopril 10 mg once daily. Maintain current exercise routines and schedule routine lab work in 6 months.`,
};
