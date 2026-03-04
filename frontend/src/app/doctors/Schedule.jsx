const days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];


const events = [
  {
    id: 1,
    dayIndex: 2, // Thứ 3
    start: "09:00",
    end: "10:00",
    name: "Lê Văn Tùng",
    status: "Đã duyệt",
    statusColor: "bg-blue-500",
    cardColor: "bg-green-500",
    service: "Khám da liễu",
    doctor: "BS. Trần T.",
  },
  {
    id: 2,
    dayIndex: 1, // Thứ 2
    start: "10:00",
    end: "11:00",
    name: "Nguyễn Văn Hoàng",
    status: "Check-in",
    statusColor: "bg-orange-500",
    cardColor: "bg-blue-600",
    service: "Khám nội ...",
    doctor: "BS. Nguyễ...",
  },
  {
    id: 3,
    dayIndex: 3, // Thứ 4
    start: "11:00",
    end: "12:00",
    name: "Phạm Thị Lan",
    status: "Check-in",
    statusColor: "bg-orange-500",
    cardColor: "bg-purple-600",
    service: "Khám xươ...",
    doctor: "BS. Lê Min...",
  },
];

// tính vị trí theo giờ (mỗi ô 1 giờ = 96px)
const ROW_HEIGHT = 96;
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const startBase = toMinutes(times[0]); // 08:00

export default function Schedule() {
  return (
    <div className="w-full h-screen bg-white rounded-2xl border border-gray-200 overflow-auto">
      {/* Header row */}
      <div className="min-w-[980px]">
        <div className="grid grid-cols-[120px_repeat(7,1fr)] border-b border-gray-200">
          <div className="p-4 text-sm font-semibold text-gray-700">Giờ</div>
          {days.map((d) => (
            <div
              key={d}
              className="p-4 text-sm font-semibold text-gray-700 border-l border-gray-200"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Body: timeline + grid */}
        <div className="grid grid-cols-[120px_repeat(7,1fr)]">
          {/* Left time column */}
          <div className="border-r border-gray-200">
            {times.map((t) => (
              <div
                key={t}
                className="h-24 px-4 py-3 text-sm text-gray-600 border-b border-gray-100"
              >
                {t}
              </div>
            ))}
          </div>

          {/* 7 day columns */}
          {Array.from({ length: 7 }).map((_, dayIndex) => (
            <div
              key={dayIndex}
              className="relative border-r border-gray-200"
              style={{ height: times.length * ROW_HEIGHT }}
            >
              {/* hour grid lines */}
              {times.map((t) => (
                <div
                  key={t}
                  className="h-24 border-b border-gray-100"
                />
              ))}

              {/* events in this day */}
              {events
                .filter((e) => e.dayIndex === dayIndex)
                .map((e) => {
                  const top =
                    ((toMinutes(e.start) - startBase) / 60) * ROW_HEIGHT;
                  const height =
                    ((toMinutes(e.end) - toMinutes(e.start)) / 60) * ROW_HEIGHT;

                  return (
                    <div
                      key={e.id}
                      className={
                        "absolute left-2 right-2 rounded-xl shadow-md text-white p-3 overflow-hidden " +
                        e.cardColor
                      }
                      style={{ top, height }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-sm leading-snug line-clamp-2">
                          {e.name}
                        </p>
                        <span
                          className={
                            "shrink-0 px-2 py-1 rounded-full text-xs font-semibold " +
                            e.statusColor
                          }
                        >
                          {e.status}
                        </span>
                      </div>

                      <div className="mt-2 text-xs opacity-95">
                        <div className="flex items-center gap-2">
                          <i className="fa-regular fa-clock" />
                          <span>
                            {e.start} - {e.end}
                          </span>
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                          <i className="fa-regular fa-calendar" />
                          <span className="truncate">{e.service}</span>
                        </div>

                        <div className="mt-1 flex items-center gap-2">
                          <i className="fa-solid fa-user-doctor" />
                          <span className="truncate">{e.doctor}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}