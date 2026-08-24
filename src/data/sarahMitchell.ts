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

export const safetyItems: SafetyItem[] = [
  { id: "s1", label: "Aspirin Allergy", severity: "critical" },
  { id: "s2", label: "Penicillin Allergy", severity: "critical" },
  { id: "s3", label: "Bleeding Risk", severity: "warning" },
  { id: "s4", label: "Reduced Kidney Function", severity: "warning" },
];

export const reasonForVisit =
  "Progressive fatigue, shortness of breath, declining activity levels, worsening sleep quality, and increasing cardiovascular risk indicators over the last 14 days.";

export const snapshotMetrics: VitalMetric[] = [
  { id: "m1", label: "Heart Rate", value: "78", unit: "bpm", trend: "up", trendGood: false, timestamp: "Today • 08:14" },
  { id: "m2", label: "Oxygen Saturation", value: "94", unit: "%", trend: "down", trendGood: false, timestamp: "Today • 09:32" },
  { id: "m3", label: "Respiratory Rate", value: "18", unit: "br/min", trend: "flat", timestamp: "Today • 08:14" },
  { id: "m4", label: "Sleep Quality", value: "58", unit: "/100", trend: "down", trendGood: false, timestamp: "Last night" },
  { id: "m5", label: "Daily Activity", value: "4,092", unit: "steps", trend: "down", trendGood: false, timestamp: "Today" },
  { id: "m6", label: "Walking Distance", value: "1.8", unit: "mi", trend: "down", trendGood: false, timestamp: "Today" },
  { id: "m7", label: "Recovery Score", value: "51", unit: "/100", trend: "down", trendGood: false, timestamp: "Today" },
  { id: "m8", label: "Medication Adherence", value: "84", unit: "%", trend: "down", trendGood: false, timestamp: "Last 7 days" },
  { id: "m9", label: "Reported Symptoms", value: "3 active", trend: "up", trendGood: false, timestamp: "Today" },
  {
    id: "m10",
    label: "Patient-Reported Blood Pressure",
    value: "138/88",
    unit: "mmHg",
    trend: "up",
    trendGood: false,
    timestamp: "Reported yesterday • 07:40",
    note: "Patient-reported, not continuously monitored",
  },
];

export const clinicalSummary: ClinicalSummary = {
  findings: [
    { id: "f1", text: "Activity decreased 34% over 14 days." },
    { id: "f2", text: "Sleep quality declined after medication adjustment." },
    { id: "f3", text: "Oxygen saturation trend is declining and warrants clinical review." },
  ],
  confidence: 92,
  basedOn: ["Wearables", "Symptoms", "Medications", "Labs", "Patient Reports"],
};

export const evidenceLibrary: Record<string, Evidence> = {
  "activity-decline": {
    title: "Activity decreased 34%",
    description: "Compared with patient's 30-day baseline.",
    source: "Apple Watch",
    sourceIcon: "⌚",
    detectedAt: "Today • 09:32",
    baseline: "6,200 steps/day",
    current: "4,092 steps/day",
    confidence: 92,
    sources: ["Wearable data", "Patient-reported activity", "Historical baseline"],
    chartData: [
      { day: "D1", value: 6300 },
      { day: "D4", value: 6100 },
      { day: "D7", value: 5800 },
      { day: "D10", value: 5100 },
      { day: "D13", value: 4400 },
      { day: "D14", value: 4092 },
    ],
  },
  "oxygen-decline": {
    title: "Oxygen saturation declining",
    description: "Trend over the past 7 days shows a gradual decline compared to baseline.",
    source: "Apple Watch",
    sourceIcon: "⌚",
    detectedAt: "30 min ago",
    baseline: "97%",
    current: "94%",
    confidence: 88,
    sources: ["Wearable data", "Historical baseline"],
    chartData: [
      { day: "D1", value: 97 },
      { day: "D3", value: 96.5 },
      { day: "D5", value: 96 },
      { day: "D7", value: 95 },
      { day: "Today", value: 94 },
    ],
  },
  "symptom-worsening": {
    title: "Symptom worsening reported",
    description: "Patient reported increased fatigue and shortness of breath via the mobile app.",
    source: "Patient Report",
    sourceIcon: "📝",
    detectedAt: "1 hour ago",
    confidence: 85,
    sources: ["Patient-reported symptoms", "Symptom history"],
  },
  "sleep-decline": {
    title: "Sleep quality declined",
    description: "Sleep quality dropped following a recent medication adjustment.",
    source: "Apple Watch",
    sourceIcon: "⌚",
    detectedAt: "Yesterday • 07:00",
    baseline: "76 /100",
    current: "58 /100",
    confidence: 90,
    sources: ["Wearable data", "Medication log"],
    chartData: [
      { day: "D1", value: 76 },
      { day: "D4", value: 72 },
      { day: "D7", value: 68 },
      { day: "D10", value: 63 },
      { day: "D14", value: 58 },
    ],
  },
  "cardio-eval": {
    title: "Cardiovascular risk indicators rising",
    description: "Combination of resting heart rate increase and patient-reported blood pressure elevation.",
    source: "Multiple sources",
    sourceIcon: "🫀",
    detectedAt: "Today",
    confidence: 81,
    sources: ["Wearable data", "Patient-reported blood pressure", "Symptom history"],
  },
};

export const concerns: Concern[] = [
  {
    id: "c1",
    severity: "critical",
    title: "Oxygen Saturation Declining",
    source: "Apple Watch",
    detectedAt: "30 min ago",
    acknowledged: false,
    evidenceKey: "oxygen-decline",
  },
  {
    id: "c2",
    severity: "warning",
    title: "Symptom Worsening Reported",
    source: "Patient Report",
    detectedAt: "1 hour ago",
    acknowledged: false,
    evidenceKey: "symptom-worsening",
  },
  {
    id: "c3",
    severity: "warning",
    title: "Activity Declined 34%",
    source: "Compared with baseline",
    detectedAt: "Today • 09:32",
    acknowledged: false,
    evidenceKey: "activity-decline",
  },
];

export const aiSuggestions: AISuggestion[] = [
  { id: "sg1", text: "Review symptom progression", evidenceKey: "symptom-worsening" },
  { id: "sg2", text: "Assess medication adherence", evidenceKey: "sleep-decline" },
  { id: "sg3", text: "Discuss declining activity", evidenceKey: "activity-decline" },
  { id: "sg4", text: "Consider additional cardiovascular evaluation", evidenceKey: "cardio-eval" },
];

export const initialPlan: PlanItem[] = [
  { id: "p1", text: "Continue current medications", done: true },
  { id: "p2", text: "Order follow-up labs", done: true },
  { id: "p3", text: "Schedule cardiology review", done: true },
  { id: "p4", text: "Monitor symptoms for 7 days", done: true },
];

export const changesByPeriod: Record<string, ChangeItem[]> = {
  "7D": [
    { id: "ch1", label: "Activity", value: "↓ 19%", direction: "down", period: "7D" },
    { id: "ch2", label: "Sleep", value: "↓ 11%", direction: "down", period: "7D" },
    { id: "ch3", label: "Recovery Score", value: "↓ 7%", direction: "down", period: "7D" },
    { id: "ch4", label: "Medication Adherence", value: "↓ 4%", direction: "down", period: "7D" },
    { id: "ch5", label: "Symptoms Increased", value: "2 new", direction: "up", period: "7D" },
    { id: "ch6", label: "New Concern Reported", value: "Shortness of breath", direction: "new", period: "7D" },
  ],
  "14D": [
    { id: "ch1", label: "Activity", value: "↓ 34%", direction: "down", period: "14D" },
    { id: "ch2", label: "Sleep", value: "↓ 18%", direction: "down", period: "14D" },
    { id: "ch3", label: "Recovery Score", value: "↓ 12%", direction: "down", period: "14D" },
    { id: "ch4", label: "Medication Adherence", value: "↓ 8%", direction: "down", period: "14D" },
    { id: "ch5", label: "Symptoms Increased", value: "3 new", direction: "up", period: "14D" },
    { id: "ch6", label: "New Concern Reported", value: "Shortness of breath", direction: "new", period: "14D" },
  ],
  "30D": [
    { id: "ch1", label: "Activity", value: "↓ 41%", direction: "down", period: "30D" },
    { id: "ch2", label: "Sleep", value: "↓ 22%", direction: "down", period: "30D" },
    { id: "ch3", label: "Recovery Score", value: "↓ 16%", direction: "down", period: "30D" },
    { id: "ch4", label: "Medication Adherence", value: "↓ 10%", direction: "down", period: "30D" },
    { id: "ch5", label: "Symptoms Increased", value: "5 new", direction: "up", period: "30D" },
    { id: "ch6", label: "New Concern Reported", value: "Reduced kidney function noted", direction: "new", period: "30D" },
  ],
  "1Y": [
    { id: "ch1", label: "Activity", value: "↓ 12%", direction: "down", period: "1Y" },
    { id: "ch2", label: "Sleep", value: "↓ 6%", direction: "down", period: "1Y" },
    { id: "ch3", label: "Recovery Score", value: "↓ 5%", direction: "down", period: "1Y" },
    { id: "ch4", label: "Medication Adherence", value: "↓ 3%", direction: "down", period: "1Y" },
    { id: "ch5", label: "Symptoms Increased", value: "8 new", direction: "up", period: "1Y" },
    { id: "ch6", label: "New Concern Reported", value: "Cardiovascular risk elevated", direction: "new", period: "1Y" },
  ],
};

export const keyFindings: Finding[] = [
  {
    id: "kf1",
    label: "Oxygen Saturation ↓",
    direction: "down",
    source: "Apple Watch",
    timestamp: "30 min ago",
    trend: [
      { day: "D1", value: 97 },
      { day: "D3", value: 96.5 },
      { day: "D5", value: 96 },
      { day: "D7", value: 95 },
      { day: "Today", value: 94 },
    ],
  },
  {
    id: "kf2",
    label: "Recovery Score ↓",
    direction: "down",
    source: "Apple Watch",
    timestamp: "Today • 06:00",
    trend: [
      { day: "D1", value: 68 },
      { day: "D5", value: 63 },
      { day: "D9", value: 58 },
      { day: "D14", value: 51 },
    ],
  },
  {
    id: "kf3",
    label: "Sleep Quality ↓",
    direction: "down",
    source: "Apple Watch",
    timestamp: "Last night",
    trend: [
      { day: "D1", value: 76 },
      { day: "D4", value: 72 },
      { day: "D7", value: 68 },
      { day: "D10", value: 63 },
      { day: "D14", value: 58 },
    ],
  },
  {
    id: "kf4",
    label: "Resting Heart Rate ↑",
    direction: "up",
    source: "Apple Watch",
    timestamp: "Today • 08:14",
    trend: [
      { day: "D1", value: 68 },
      { day: "D5", value: 71 },
      { day: "D9", value: 74 },
      { day: "D14", value: 78 },
    ],
  },
  {
    id: "kf5",
    label: "Activity Level ↓",
    direction: "down",
    source: "Apple Watch",
    timestamp: "Today • 09:32",
    trend: [
      { day: "D1", value: 6300 },
      { day: "D7", value: 5800 },
      { day: "D14", value: 4092 },
    ],
  },
  {
    id: "kf6",
    label: "Medication Adherence Issues",
    direction: "down",
    source: "Mobile Health",
    timestamp: "Last 7 days",
    trend: [
      { day: "D1", value: 92 },
      { day: "D7", value: 88 },
      { day: "D14", value: 84 },
    ],
  },
];

export const trendSeries: TrendSeries[] = [
  {
    id: "hr",
    label: "Heart Rate",
    unit: "bpm",
    source: "Apple Watch",
    data: [
      { day: "D1", value: 68 }, { day: "D2", value: 69 }, { day: "D3", value: 70 },
      { day: "D4", value: 70 }, { day: "D5", value: 71 }, { day: "D6", value: 72 },
      { day: "D7", value: 73 }, { day: "D8", value: 73 }, { day: "D9", value: 74 },
      { day: "D10", value: 75 }, { day: "D11", value: 76 }, { day: "D12", value: 76 },
      { day: "D13", value: 77 }, { day: "D14", value: 78 },
    ],
  },
  {
    id: "spo2",
    label: "Oxygen Saturation",
    unit: "%",
    source: "Apple Watch",
    data: [
      { day: "D1", value: 97 }, { day: "D2", value: 97 }, { day: "D3", value: 96.8 },
      { day: "D4", value: 96.5 }, { day: "D5", value: 96.2 }, { day: "D6", value: 96 },
      { day: "D7", value: 95.6 }, { day: "D8", value: 95.4 }, { day: "D9", value: 95.1 },
      { day: "D10", value: 94.9 }, { day: "D11", value: 94.7 }, { day: "D12", value: 94.5 },
      { day: "D13", value: 94.2 }, { day: "D14", value: 94 },
    ],
  },
  {
    id: "sleep",
    label: "Sleep",
    unit: "/100",
    source: "Apple Watch",
    data: [
      { day: "D1", value: 76 }, { day: "D2", value: 75 }, { day: "D3", value: 74 },
      { day: "D4", value: 72 }, { day: "D5", value: 70 }, { day: "D6", value: 69 },
      { day: "D7", value: 68 }, { day: "D8", value: 66 }, { day: "D9", value: 65 },
      { day: "D10", value: 63 }, { day: "D11", value: 61 }, { day: "D12", value: 60 },
      { day: "D13", value: 59 }, { day: "D14", value: 58 },
    ],
  },
  {
    id: "activity",
    label: "Activity",
    unit: "steps",
    source: "Apple Watch",
    data: [
      { day: "D1", value: 6300 }, { day: "D2", value: 6200 }, { day: "D3", value: 6100 },
      { day: "D4", value: 5900 }, { day: "D5", value: 5800 }, { day: "D6", value: 5600 },
      { day: "D7", value: 5400 }, { day: "D8", value: 5200 }, { day: "D9", value: 5000 },
      { day: "D10", value: 4800 }, { day: "D11", value: 4600 }, { day: "D12", value: 4400 },
      { day: "D13", value: 4200 }, { day: "D14", value: 4092 },
    ],
  },
  {
    id: "recovery",
    label: "Recovery Score",
    unit: "/100",
    source: "Apple Watch",
    data: [
      { day: "D1", value: 68 }, { day: "D2", value: 67 }, { day: "D3", value: 65 },
      { day: "D4", value: 64 }, { day: "D5", value: 63 }, { day: "D6", value: 61 },
      { day: "D7", value: 60 }, { day: "D8", value: 58 }, { day: "D9", value: 57 },
      { day: "D10", value: 55 }, { day: "D11", value: 54 }, { day: "D12", value: 53 },
      { day: "D13", value: 52 }, { day: "D14", value: 51 },
    ],
  },
  {
    id: "adherence",
    label: "Medication Adherence",
    unit: "%",
    source: "Mobile Health",
    data: [
      { day: "D1", value: 92 }, { day: "D2", value: 91 }, { day: "D3", value: 90 },
      { day: "D4", value: 89 }, { day: "D5", value: 88 }, { day: "D6", value: 87 },
      { day: "D7", value: 88 }, { day: "D8", value: 87 }, { day: "D9", value: 86 },
      { day: "D10", value: 86 }, { day: "D11", value: 85 }, { day: "D12", value: 85 },
      { day: "D13", value: 84 }, { day: "D14", value: 84 },
    ],
  },
];

export const medications: Medication[] = [
  { id: "med1", name: "Metoprolol", dose: "25 mg", frequency: "Twice daily", adherence: 84, startDate: "Mar 2, 2025" },
  { id: "med2", name: "Atorvastatin", dose: "20 mg", frequency: "Once daily", adherence: 92, startDate: "Jan 14, 2025" },
  { id: "med3", name: "Lisinopril", dose: "10 mg", frequency: "Once daily", adherence: 88, startDate: "Jan 14, 2025" },
];

export const timeline: TimelineEvent[] = [
  { id: "t1", when: "Today", title: "Symptom worsening reported", detail: "Patient reported increased fatigue and shortness of breath." },
  { id: "t2", when: "Yesterday", title: "Sleep quality declined", detail: "Sleep score dropped to 58/100, down from a 76/100 baseline." },
  { id: "t3", when: "3 Days Ago", title: "Activity decrease detected", detail: "Daily step count fell below the 5,000 threshold for the first time in 90 days." },
  { id: "t4", when: "7 Days Ago", title: "Medication adjustment", detail: "Metoprolol dose reviewed following elevated resting heart rate." },
  { id: "t5", when: "14 Days Ago", title: "Previous consultation", detail: "Routine follow-up. Vitals stable, plan to monitor activity trends." },
  { id: "t6", when: "30 Days Ago", title: "Baseline assessment", detail: "Comprehensive baseline established across wearable and lab metrics." },
];

export const doctorNotes: DoctorNote[] = [
  { id: "n1", category: "Recommendations", text: "Consider stress echo if symptoms persist beyond 7 days.", author: "Dr. Patel", time: "14 days ago" },
  { id: "n2", category: "Follow-up Instructions", text: "Return in 1 week or sooner if shortness of breath worsens.", author: "Dr. Patel", time: "14 days ago" },
  { id: "n3", category: "Lifestyle Guidance", text: "Encouraged light daily walking as tolerated; avoid overexertion.", author: "Dr. Patel", time: "14 days ago" },
  { id: "n4", category: "Patient Comments", text: "Patient notes increased fatigue in the afternoons this week.", author: "Sarah Mitchell", time: "2 days ago" },
];

export const soapNoteDraft = `S: Patient reports progressive fatigue, shortness of breath on exertion, and declining activity tolerance over the past 14 days. Sleep quality has also declined since the last medication adjustment.

O: HR 78 bpm (baseline 68), SpO2 94% (baseline 97%), patient-reported BP 138/88 mmHg. Wearable activity down 34% from 30-day baseline. Recovery score 51/100, down from 68/100.

A: Findings are consistent with declining cardiovascular tolerance and possible medication-related sleep disruption. Downward trend across activity, recovery, and oxygen saturation warrants closer monitoring.

P: Continue current medications. Order follow-up labs. Schedule cardiology review. Monitor symptoms over the next 7 days and reassess.`;
