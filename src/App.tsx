import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Patients from "./pages/Patients";
import PatientIntelligence from "./pages/PatientIntelligence";
import Consultation from "./pages/Consultation";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/:patientId" element={<PatientIntelligence />} />
        <Route path="/consultation/:patientId" element={<Consultation />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  );
}
