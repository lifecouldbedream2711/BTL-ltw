import { useEffect, useMemo, useState } from "react";
import SubButton from "../../components/button/SubButton";
import TextInput from "../../components/input/textInput";
import ManaAppointment from "../../components/card/ManaAppointment";
import { getAllAppointments, updateAppointmentStatus } from "../../service/appointmentApi";

export default function ManageAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  const loadAppointments = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllAppointments({ enrich: true });
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setError("Không tải được danh sách lịch hẹn.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  // chỉ hiện ở hiện tại + tương lai (theo shiftDate)
  const futureAppointments = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return appointments.filter((a) => {
      const raw = a?.shiftDate;
      if (!raw) return false;

      let d = null;
      // dd/mm/yyyy
      if (raw.includes("/")) {
        const [dd, mm, yyyy] = raw.split("/").map(Number);
        d = new Date(yyyy, (mm || 1) - 1, dd || 1);
      }
      // yyyy-mm-dd
      else if (raw.includes("-")) {
        d = new Date(`${raw}T00:00:00`);
      }

      return d instanceof Date && !Number.isNaN(d.getTime()) && d >= today;
    });
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const q = keyword.trim().toLowerCase();
    if (!q) return futureAppointments;

    return futureAppointments.filter((a) => {
      const patient = String(a?.patientName || a?.patientId || "").toLowerCase();
      const doctor = String(a?.doctorName || "").toLowerCase();
      const specialty = String(a?.specialtyName || "").toLowerCase();
      const service = String(a?.serviceName || "").toLowerCase();
      const status = String(a?.status || "").toLowerCase();
      return (
        patient.includes(q) ||
        doctor.includes(q) ||
        specialty.includes(q) ||
        service.includes(q) ||
        status.includes(q)
      );
    });
  }, [futureAppointments, keyword]);

  const handleApprove = async (appointment) => {
    const ok = window.confirm("Approve appointment? (PENDING -> CONFIRMED)");
    if (!ok) return;
    setUpdatingId(appointment.id);
    try {
      await updateAppointmentStatus(appointment.id, "CONFIRMED");
      await loadAppointments();
    } catch (e) {
      alert(e?.response?.data?.message || "Approve thất bại");
    } finally {
      setUpdatingId("");
    }
  };

  const handleReject = async (appointment) => {
    const ok = window.confirm("Reject appointment? (PENDING -> CANCELED)");
    if (!ok) return;
    setUpdatingId(appointment.id);
    try {
      await updateAppointmentStatus(appointment.id, "CANCELED");
      await loadAppointments();
    } catch (e) {
      alert(e?.response?.data?.message || "Reject thất bại");
    } finally {
      setUpdatingId("");
    }
  };

  const handleCheckIn = async (appointment) => {
    const ok = window.confirm("Check in appointment? (CONFIRMED -> CHECKED_IN)");
    if (!ok) return;
    setUpdatingId(appointment.id);
    try {
      await updateAppointmentStatus(appointment.id, "CHECKED_IN");
      await loadAppointments();
    } catch (e) {
      alert(e?.response?.data?.message || "Check in thất bại");
    } finally {
      setUpdatingId("");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Manage Appointments</h1>
      <p className="text-gray-600">Review future appointments.</p>

      <div className="flex mt-5 gap-2">
        <TextInput
          placeholder="Search by patient, doctor, specialty, service"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="w-28">
          <SubButton text="Reload" onClick={loadAppointments} />
        </div>
      </div>

      {loading && <p className="mt-4">Loading appointments...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-4 flex flex-col gap-3">
          {filteredAppointments.length === 0 ? (
            <p className="text-gray-500">No future appointments found.</p>
          ) : (
            filteredAppointments.map((appointment) => (
              <ManaAppointment
                key={appointment.id}
                appointment={appointment}
                onApprove={handleApprove}
                onReject={handleReject}
                onCheckIn={handleCheckIn}
                disabled={updatingId === appointment.id}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}