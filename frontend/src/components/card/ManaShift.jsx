export default function ManageShiftCard(props) {
  // hỗ trợ: <ManageShiftCard shift={s}/> hoặc <ManageShiftCard {...s}/>
  const shift = props.shift ?? props;

  const isOpen = shift?.is_open ?? true;

  // format date: "2026-02-04" -> "2/4/2026" (giống ảnh)
  const dateText = (() => {
    const d = shift?.shift_date;
    if (!d) return "-";
    const parts = d.split("-").map(Number);
    if (parts.length !== 3) return d;
    const [yyyy, mm, dd] = parts;
    if (!yyyy || !mm || !dd) return d;
    return `${mm}/${dd}/${yyyy}`;
  })();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl w-full shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        {/* LEFT */}
        <div className="min-w-0">
          {/* Doctor + specialty pill */}
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-xl font-semibold text-gray-900">
              {shift?.doctor_name ?? "Doctor"}
            </h2>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
              {shift?.specialty ?? "Specialty"}
            </span>
          </div>

          {/* Date + time row */}
          <div className="mt-3 flex items-center gap-6 flex-wrap text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar text-gray-500" />
              <span>{dateText}</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-gray-500" />
              <span>
                {shift?.start_time ?? "--:--"} - {shift?.end_time ?? "--:--"}
              </span>
            </div>
          </div>

          {/* Slot + max patients */}
          <div className="mt-3 text-sm text-gray-700">
            <span className="text-gray-600">
              Slot: <span className="text-gray-900">{shift?.slot_min ?? "-"}</span> min
            </span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-600">
              Max patients:{" "}
              <span className="text-gray-900">{shift?.max_patients ?? "-"}</span>
            </span>
          </div>

          {/* Note */}
          <p className="mt-3 text-sm text-gray-700">{shift?.note ?? ""}</p>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          {/* OPEN badge */}
          <span className="px-4 py-1.5 rounded-full text-xs font-semibold bg-gray-900 text-white">
            {isOpen ? "OPEN" : "CLOSED"}
          </span>

          {/* Close + toggle (UI only) */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">Close</span>

            <button
              type="button"
              className={
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors " +
                (isOpen ? "bg-gray-900" : "bg-gray-300")
              }
              aria-label="Toggle open"
            >
              <span
                className={
                  "inline-block h-4 w-4 transform rounded-full bg-white transition-transform " +
                  (isOpen ? "translate-x-5" : "translate-x-0")
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}