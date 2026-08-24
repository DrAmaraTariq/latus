import { useParams, Navigate } from "react-router-dom";
import AppShell from "../layouts/AppShell";
import { EvidenceProvider } from "../hooks/useEvidence";
import EvidenceDrawer from "../components/patient/EvidenceDrawer";
import PatientHeader from "../components/patient/PatientHeader";
import SafetyAlerts from "../components/patient/SafetyAlerts";
import PatientSnapshot from "../components/patient/PatientSnapshot";
import ClinicalSummary from "../components/patient/ClinicalSummary";
import ImmediateConcerns from "../components/patient/ImmediateConcerns";
import AISuggestedActions from "../components/patient/AISuggestedActions";
import PhysicianPlan from "../components/patient/PhysicianPlan";
import RecentChanges from "../components/patient/RecentChanges";
import KeyFindings from "../components/patient/KeyFindings";
import TrendCharts from "../components/patient/TrendCharts";
import MedicationList from "../components/patient/MedicationList";
import PatientTimeline from "../components/patient/PatientTimeline";
import DoctorNotes from "../components/patient/DoctorNotes";
import { getPatient } from "../data/patients";
import { johnPatientData } from "../data/johnsmith";
import {
  safetyItems,
  reasonForVisit,
  snapshotMetrics,
  clinicalSummary,
  concerns,
  aiSuggestions,
  initialPlan,
  keyFindings,
  medications,
  timeline,
  doctorNotes,
  evidenceLibrary,
  changesByPeriod,
  trendSeries,
} from "../data/sarahMitchell";
import PatientAvatar from "../components/PatientAvatar";
import RiskBadge from "../components/RiskBadge";
import { useNavigate } from "react-router-dom";

function GenericPatientView({ patientId }: { patientId: string }) {
  const patient = getPatient(patientId);
  const navigate = useNavigate();
  if (!patient) return null;

  return (
    <AppShell title="Clinical Intelligence" breadcrumb="Patients">
      <div className="bg-surface border border-border rounded-lg shadow-subtle p-6 flex items-center gap-4">
        <PatientAvatar name={patient.name} color={patient.avatarColor} size="lg" />
        <div className="flex-1">
          <h2 className="text-[18px] font-semibold text-ink">{patient.name}</h2>
          <p className="text-[13px] text-muted mt-0.5">{patient.age} • {patient.sex} • {patient.mrn}</p>
          <div className="mt-2"><RiskBadge risk={patient.risk} /></div>
        </div>
        <button
          onClick={() => navigate(`/consultation/${patient.id}`)}
          className="px-4 py-2.5 bg-brand-600 text-white text-[13px] font-medium rounded-md hover:bg-brand-700 transition-colors"
        >
          Start Consultation
        </button>
      </div>
      <div className="mt-6 bg-surface border border-border rounded-lg shadow-subtle p-6 text-center">
        <p className="text-[13.5px] text-muted">
          Full clinical intelligence detail for this patient isn't part of this prototype yet.
        </p>
        <p className="text-[12.5px] text-muted mt-1">
          Try <button onClick={() => navigate("/patients/sarah-mitchell")} className="text-brand-700 font-medium hover:underline">Sarah Mitchell</button> for the complete Clinical Intelligence experience.
        </p>
      </div>
    </AppShell>
  );
}

export default function PatientIntelligence() {
  const { patientId } = useParams();
  if (!patientId) return <Navigate to="/patients" replace />;
  const patient = getPatient(patientId);
  if (!patient) return <Navigate to="/patients" replace />;

  if (patientId !== "sarah-mitchell" && patientId !== "john-smith") {
    return <GenericPatientView patientId={patientId} />;
  }

  const record = patientId === "john-smith"
    ? johnPatientData
    : {
        ...patient,
        safetyItems,
        reasonForVisit,
        snapshotMetrics,
        clinicalSummary,
        concerns,
        aiSuggestions,
        initialPlan,
        keyFindings,
        medications,
        timeline,
        doctorNotes,
        evidenceLibrary,
        changesByPeriod,
        trendSeries,
      };

  return (
    <EvidenceProvider>
      <AppShell title="Clinical Intelligence" breadcrumb="Patients">
        <div className="space-y-5">
          <PatientHeader patient={patient} />
          <SafetyAlerts items={record.safetyItems} />

          <div className="bg-surface border border-border rounded-lg shadow-subtle p-4">
            <h3 className="text-[13.5px] font-semibold text-ink mb-2">Why they're here</h3>
            <p className="text-[13.5px] text-ink leading-relaxed">{record.reasonForVisit}</p>
          </div>

          <PatientSnapshot metrics={record.snapshotMetrics} />
          <ClinicalSummary summary={record.clinicalSummary} evidenceKey={patientId === "john-smith" ? "activity-stable" : undefined} />
          <ImmediateConcerns concerns={record.concerns} />
          <AISuggestedActions suggestions={record.aiSuggestions} />
          <PhysicianPlan initial={record.initialPlan} />
          <RecentChanges changesByPeriod={record.changesByPeriod} />
          <KeyFindings findings={record.keyFindings} />
          <TrendCharts trendSeries={record.trendSeries} />
          <MedicationList medications={record.medications} />
          <PatientTimeline events={record.timeline} />
          <DoctorNotes notes={record.doctorNotes} />
        </div>
        <EvidenceDrawer evidenceLibrary={record.evidenceLibrary} />
      </AppShell>
    </EvidenceProvider>
  );
}
