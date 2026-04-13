const STATUS_STYLE = {
  PENDING: "bg-yellow-100 text-yellow-800",
  CONFIRMED: "bg-blue-100 text-blue-800",
  CHECKED_IN: "bg-indigo-100 text-indigo-800",
  DONE: "bg-emerald-100 text-emerald-800",
  CANCELED: "bg-rose-100 text-rose-800",
  NO_SHOW: "bg-gray-200 text-gray-700",
};

export default function ManaAppointment({
  appointment = {},
  onApprove,
  onReject,
  onCheckIn,
  disabled,
}) {
  const status = String(appointment?.status || "PENDING").toUpperCase();
  const badgeClass = STATUS_STYLE[status] || "bg-gray-100 text-gray-700";

  const serviceName = appointment?.serviceName || appointment?.service?.name || "Dịch vụ";
  const patientName = appointment?.patientName || appointment?.patientFullName || "Chưa có bệnh nhân";
  const doctorName = appointment?.doctorName || "Chưa có bác sĩ";
  const dateText = appointment?.shiftDate || "N/A";
  const timeText =
    appointment?.startAt && appointment?.endAt
      ? `${appointment.startAt}-${appointment.endAt}`
      : appointment?.startAt || "N/A";

  const canReview = status === "PENDING";
  const canCheckIn = status === "CONFIRMED";

  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm">
      <div className="flex items-center justify-between gap-3 text-sm">
        {/* 1 hàng info */}
        <div className="min-w-0 flex items-center gap-4 overflow-hidden">
          <span className="font-semibold text-gray-900 truncate max-w-[180px]">{serviceName}</span>
          <span className="truncate max-w-[180px]"><span className="text-gray-500">BN:</span> {patientName}</span>
          <span className="truncate max-w-[180px]"><span className="text-gray-500">BS:</span> {doctorName}</span>
          <span className="whitespace-nowrap text-gray-700">{dateText}</span>
          <span className="whitespace-nowrap text-gray-700">{timeText}</span>
        </div>

        {/* status + action */}
        <div className="shrink-0 flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-[11px] font-semibold ${badgeClass}`}>
            {status}
          </span>

          {canReview && (
            <>
              <button
                disabled={disabled}
                onClick={() => onReject?.(appointment)}
                className="px-2.5 py-1 rounded border border-rose-300 text-rose-700 text-xs hover:bg-rose-50 disabled:opacity-60"
              >
                Reject
              </button>
              <button
                disabled={disabled}
                onClick={() => onApprove?.(appointment)}
                className="px-2.5 py-1 rounded bg-emerald-600 text-white text-xs hover:bg-emerald-700 disabled:opacity-60"
              >
                Approve
              </button>
            </>
          )}

          {canCheckIn && (
            <button
              disabled={disabled}
              onClick={() => onCheckIn?.(appointment)}
              className="px-2.5 py-1 rounded bg-indigo-600 text-white text-xs hover:bg-indigo-700 disabled:opacity-60"
            >
              Check in
            </button>
          )}
        </div>
      </div>
    </div>
  );
}