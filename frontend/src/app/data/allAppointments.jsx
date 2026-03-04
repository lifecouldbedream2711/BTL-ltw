
 export const allAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    status: "APPROVED", // upcoming
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    serviceName: "Cardiac Consultation",
    price: 150,
    durationMin: 45,
    dateText: "Tuesday, February 10, 2026",
    timeText: "04:00 PM",
    reason: "Routine cardiac checkup",
    initials: "DSJ",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    status: "PENDING", // upcoming
    doctorName: "Dr. Michael Lee",
    specialty: "Dermatology",
    serviceName: "Skin Examination",
    price: 90,
    durationMin: 30,
    dateText: "Friday, March 6, 2026",
    timeText: "10:30 AM",
    reason: "Rash consultation",
    initials: "DML",
  },
  {
    id: 3,
    patientName: "Robert Brown",
    status: "DONE", // history
    doctorName: "Dr. Emma Wilson",
    specialty: "General Practice",
    serviceName: "Annual Checkup",
    price: 60,
    durationMin: 20,
    dateText: "Monday, January 12, 2026",
    timeText: "09:00 AM",
    reason: "General checkup",
    initials: "DEW",
  },
];