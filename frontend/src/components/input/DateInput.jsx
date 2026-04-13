import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

export default function DateInput({
  className = "",
  allowedDates = [], // ["2026-04-15", "2026-04-25"]
  value,             // "yyyy-MM-dd"
  onChange,          // nhận event-like: { target: { value: "yyyy-MM-dd" } }
  ...props
}) {
  const toYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const parseYMD = (s) => {
    if (!s) return null;
    const [y, m, d] = s.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  };

  const allowedSet = new Set(allowedDates);
  const selectedDate = parseYMD(value);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className={twMerge("w-[80%] mb-3", className)}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => {
          const v = date ? toYMD(date) : "";
          onChange?.({ target: { value: v } });
        }}
        minDate={today}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd/mm/yyyy"
        // CHỈ cho bấm ngày có lịch
        filterDate={(date) => {
          const ymd = toYMD(date);
          return allowedSet.has(ymd);
        }}
        className="border w-full focus:outline-none focus:border-[#0EA4B5] h-11.5 border-gray-300 p-1 shadow-md rounded-md px-[2%]"
        {...props}
      />
    </div>
  );
}