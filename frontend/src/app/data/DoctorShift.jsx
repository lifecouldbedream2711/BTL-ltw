
export const doctorShifts = [
  {
    id: "shift-1",
    doctor_id: "doc-2",
    doctor_name: "Dr. Michael Chen",
    specialty: "Dermatology",

    shift_date: "2026-02-04", // YYYY-MM-DD
    start_time: "08:00",
    end_time: "12:00",

    slot_min: 30,
    max_patients: 1,
    note: "Morning shift",

    is_open: true,
  },
  {
    id: "shift-2",
    doctor_id: "doc-2",
    doctor_name: "Dr. Michael Chen",
    specialty: "Dermatology",

    shift_date: "2026-02-04",
    start_time: "14:00",
    end_time: "18:00",

    slot_min: 30,
    max_patients: 1,
    note: "Afternoon shift",

    is_open: true,
  },
  {
    id: "shift-3",
    doctor_id: "doc-3",
    doctor_name: "Dr. Emily Rodriguez",
    specialty: "Pediatrics",

    shift_date: "2026-02-04",
    start_time: "08:00",
    end_time: "12:00",

    slot_min: 30,
    max_patients: 1,
    note: "Morning shift",

    is_open: true,
  },
  {
    id: "shift-4",
    doctor_id: "doc-1",
    doctor_name: "Dr. Sarah Johnson",
    specialty: "Cardiology",

    shift_date: "2026-02-05",
    start_time: "09:00",
    end_time: "12:00",

    slot_min: 15,
    max_patients: 4,
    note: "Morning clinic",

    is_open: false, // ví dụ ca đóng
  },
];