import { useEffect, useState } from "react";
import AppointmentCard from "./patientCompoment/Appointments";
import {
  getAppointmentsByPatient,
  updateAppointmentStatus,
  getMedicalRecordByAppointment,
} from "../../service/appointmentApi";

const DONE_STATUSES = ["DONE", "CANCELLED"];

const TABS = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past",     label: "Past"     },
];

export default function MyAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading,      setLoading]      = useState(false);
  const [error,        setError]        = useState("");
  const [tab,          setTab]          = useState("upcoming");
  const [cancellingId, setCancellingId] = useState(null);

  const loadMyAppointments = async () => {
    const user      = JSON.parse(localStorage.getItem("user") || "null");
    const patientId = user?.id;

    if (!patientId) {
      setError("Patient info not found. Please log in again.");
      setAppointments([]);
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await getAppointmentsByPatient(patientId);
      setAppointments(Array.isArray(data) ? data : []);
    } catch {
      setError("Could not load appointments. Please try again.");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (appointmentId) => {
    const ok = window.confirm("Are you sure you want to cancel this appointment?");
    if (!ok) return;
    setCancellingId(appointmentId);
    try {
      await updateAppointmentStatus(appointmentId, "CANCELLED");
      await loadMyAppointments();
    } catch {
      alert("Failed to cancel appointment. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  useEffect(() => { loadMyAppointments(); }, []);

  const upcoming  = appointments.filter((a) => !DONE_STATUSES.includes((a?.status || "").toUpperCase()));
  const past      = appointments.filter((a) =>  DONE_STATUSES.includes((a?.status || "").toUpperCase()));
  const displayed = tab === "upcoming" ? upcoming : past;

  return (
    <div style={{  margin: "0 auto", padding: "2rem 1rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "26px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
          My Appointments
        </h1>
        <p style={{ fontSize: "14px", color: "#9ca3af" }}>
          View and manage your appointments
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "inline-flex", background: "#f3f4f6",
          borderRadius: "10px", padding: "3px", marginBottom: "1.25rem",
        }}
      >
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: "6px 18px", borderRadius: "8px", border: "none",
              fontSize: "13px", fontWeight: 500, cursor: "pointer",
              transition: "all 0.15s",
              background: tab === key ? "#fff" : "transparent",
              color:      tab === key ? "#111" : "#9ca3af",
              boxShadow:  tab === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
            }}
          >
            {label}
            {key === "upcoming" && upcoming.length > 0 && (
              <span
                style={{
                  marginLeft: "6px",
                  background: "#4F46E5", color: "#fff",
                  borderRadius: "999px", padding: "1px 7px", fontSize: "11px",
                }}
              >
                {upcoming.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ textAlign: "center", padding: "3rem 0", color: "#9ca3af", fontSize: "14px" }}>
          Loading appointments...
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div
          style={{
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: "12px", padding: "1rem 1.25rem",
            color: "#991B1B", fontSize: "14px",
            display: "flex", alignItems: "center", gap: "8px",
          }}
        >
          <span>⚠️</span> {error}
        </div>
      )}

      {/* List */}
      {!loading && !error && (
        <div>
          {displayed.length === 0 ? (
            <div
              style={{
                textAlign: "center", padding: "3rem 2rem",
                background: "#f9fafb", borderRadius: "16px",
                border: "1px dashed #e5e7eb",
              }}
            >
              <p style={{ fontSize: "15px", color: "#6b7280", fontWeight: 500 }}>
                {tab === "upcoming" ? "No upcoming appointments" : "No past appointments"}
              </p>
              <p style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
                {tab === "upcoming"
                  ? "Book one with your doctor."
                  : "Completed appointments will appear here."}
              </p>
            </div>
          ) : (
            displayed.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewPrescription={getMedicalRecordByAppointment}
              >
                {/* Cancel button — AppointmentCard hides children when DONE/CANCELLED */}
                <button
                  onClick={() => handleCancel(appointment.id)}
                  disabled={cancellingId === appointment.id}
                  style={{
                    padding: "7px 14px", borderRadius: "8px",
                    background: cancellingId === appointment.id ? "#fca5a5" : "#FEF2F2",
                    color: "#991B1B", fontSize: "13px", fontWeight: 500,
                    border: "1px solid #FECACA",
                    cursor: cancellingId === appointment.id ? "not-allowed" : "pointer",
                  }}
                >
                  {cancellingId === appointment.id ? "Cancelling..." : "Cancel"}
                </button>
              </AppointmentCard>
            ))
          )}
        </div>
      )}
    </div>
  );
}
