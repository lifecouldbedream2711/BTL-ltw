import { useEffect, useMemo, useState } from "react";
import AppointmentCard from "./patientCompoment/Appointments";
import {
  getAppointmentsByPatient,
  getMedicalRecordByAppointment,
} from "../../service/appointmentApi";

const PAST_STATUSES = ["DONE", "CANCELLED"];

export default function History() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = async () => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const patientId = user?.id;

    if (!patientId) {
      setError("Không tìm thấy thông tin bệnh nhân. Vui lòng đăng nhập lại.");
      setAppointments([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      // hàm này đã enrich: doctorName, specialtyName, serviceName, shiftDate
      const data = await getAppointmentsByPatient(patientId);
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setError("Không tải được lịch sử khám.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const pastAppointments = useMemo(() => {
    return appointments.filter((a) =>
      PAST_STATUSES.includes(String(a?.status || "").toUpperCase())
    );
  }, [appointments]);

  return (
    <div className="w-full min-h-screen p-4">
      <div>
        <p className="text-4xl mb-2 font-medium">Appointment History</p>
        <p className="opacity-55">View and manage your past appointments</p>
      </div>

      {loading && <p className="mt-4">Loading history...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-4">
          {pastAppointments.length === 0 ? (
            <p className="opacity-70">No past appointments.</p>
          ) : (
            pastAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewPrescription={getMedicalRecordByAppointment}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}