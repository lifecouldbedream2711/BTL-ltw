import { useState } from "react";
import MedicalRecordModal from "./prescriptionModal";

const STATUS_CONFIG = {
  CONFIRMED: { label: "Confirmed", bg: "#EEF2FF", color: "#4338CA" },
  APPROVED: { label: "Approved", bg: "#EEF2FF", color: "#4338CA" },
  DONE: { label: "Done", bg: "#ECFDF5", color: "#065F46" },
  CANCELLED: { label: "Cancelled", bg: "#FEF2F2", color: "#991B1B" },
  PENDING: { label: "Pending", bg: "#FFFBEB", color: "#92400E" },
};

export default function AppointmentCard({ appointment = {}, children, onViewPrescription }) {
  const [openRx, setOpenRx] = useState(false);
  const [record, setRecord] = useState(null);
  const [rxLoading, setRxLoading] = useState(false);

  const status = String(appointment?.status || "PENDING").toUpperCase();
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

  const doctorName = appointment?.doctorName || "Doctor";
  const specialtyName = appointment?.specialtyName || "—";
  const serviceName = appointment?.serviceName || "—";
  const dateText = appointment?.shiftDate || "—";
  const timeText =
    appointment?.startAt && appointment?.endAt
      ? `${appointment.startAt} - ${appointment.endAt}`
      : appointment?.startAt || "—";

  const handleViewRecord = async () => {
    setOpenRx(true);
    setRxLoading(true);
    try {
      const raw = onViewPrescription ? await onViewPrescription(appointment) : null;
      setRecord(
        raw
          ? {
              doctorName,
              date: dateText,
              symptoms: raw.symptoms ?? "",
              diagnosis: raw.diagnosis ?? "",
              notes: raw.notes ?? "",
            }
          : { doctorName, date: dateText, symptoms: "", diagnosis: "", notes: "" }
      );
    } finally {
      setRxLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-3 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-semibold">{doctorName}</p>
            <p className="text-sm text-gray-500">{specialtyName}</p>
          </div>
          <span
            className="px-2 py-1 rounded-full text-xs font-semibold"
            style={{ background: cfg.bg, color: cfg.color }}
          >
            {cfg.label}
          </span>
        </div>

        <div className="mt-3 text-sm">
          <p><b>Service:</b> {serviceName}</p>
          <p><b>Date:</b> {dateText}</p>
          <p><b>Time:</b> {timeText}</p>
          {appointment?.reason ? <p><b>Reason:</b> {appointment.reason}</p> : null}
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {status === "DONE" && (
            <button
              onClick={handleViewRecord}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm"
            >
              View Medical Record
            </button>
          )}
          {status !== "DONE" && status !== "CANCELLED" && children}
        </div>
      </div>

      <MedicalRecordModal
        open={openRx}
        onClose={() => {
          setOpenRx(false);
          setRecord(null);
        }}
        record={record}
        loading={rxLoading}
      />
    </>
  );
}