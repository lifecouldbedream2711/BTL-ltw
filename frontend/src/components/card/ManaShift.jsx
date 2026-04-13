export default function ManageShiftCard({
  shift = {},
  doctorName = "Bác sĩ",
  specialtyName = "Chưa có khoa",
  onToggleOpen,
  toggling = false,
}) {
  const isOpen = shift?.bookable ?? true;

  const dateText = (() => {
    const d = shift?.shiftDate;
    if (!d) return "-";
    const [yyyy, mm, dd] = d.split("-").map(Number);
    if (!yyyy || !mm || !dd) return d;
    return `${mm}/${dd}/${yyyy}`;
  })();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl w-full shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-gray-900">{doctorName}</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
              {specialtyName}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-6 flex-wrap text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar text-gray-500" />
              <span>{dateText}</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-gray-500" />
              <span>{shift?.startTime || "--:--"} - {shift?.endTime || "--:--"}</span>
            </div>
          </div>

          <div className="mt-3 text-sm text-gray-700">
            Slot: {shift?.slotMin ?? "-"} min | Max patients: {shift?.maxPatients ?? "-"}
          </div>

          <p className="mt-3 text-sm text-gray-700">{shift?.note ?? ""}</p>
        </div>

        <div className="flex flex-col items-end gap-3 shrink-0">
          <span className={`px-4 py-1.5 rounded-full text-xs font-semibold ${isOpen ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"}`}>
            {isOpen ? "OPEN" : "CLOSED"}
          </span>

          <button
            type="button"
            onClick={onToggleOpen}
            disabled={toggling}
            className="text-sm px-3 py-1 rounded border hover:bg-gray-50 disabled:opacity-60"
          >
            {toggling ? "Updating..." : isOpen ? "Turn off" : "Turn on"}
          </button>
        </div>
      </div>
    </div>
  );
}