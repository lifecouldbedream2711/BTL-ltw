import api from "./apiconfig";
import { getPatientById } from "./patientApi";

// ─── Normalizers ──────────────────────────────────────────────────────────────
const normalizeAppointment = (a = {}) => ({
  ...a,
  id: a?.id ?? "",
  patientId: a?.patientId ?? "",
  serviceId: a?.serviceId ?? "",
  shiftId: a?.shiftId ?? "",
  status: a?.status ?? "",
  reason: a?.reason ?? "",
  startAt: a?.startAt ?? "",
  endAt: a?.endAt ?? "",
  createdAt: a?.createdAt ?? null,

  // enriched
  patientName: a?.patientName ?? null,
  doctorName: a?.doctorName ?? null,
  specialtyName: a?.specialtyName ?? null,
  serviceName: a?.serviceName ?? null,
  shiftDate: a?.shiftDate ?? null,
  medicalRecordId: a?.medicalRecordId ?? null,
});

const normalizeMedicalRecord = (r = {}) => ({
  id: r?.id ?? "",
  appointmentId: r?.appointmentId ?? "",
  symptoms: r?.symptoms ?? "",
  diagnosis: r?.diagnosis ?? "",
  notes: r?.notes ?? "",
});

// ─── Cache ────────────────────────────────────────────────────────────────────
const cache = {
  services: null, // Map<id, service>
  shiftsById: new Map(), // shiftId -> shift
  doctorsById: new Map(), // doctorId -> doctor projection
  patientsById: new Map(), // patientId -> patient projection
  medicalRecords: new Map(), // appointmentId -> record|null
};

const formatYMDToDMY = (ymd) => {
  if (!ymd || typeof ymd !== "string") return null;
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${d}/${m}/${y}`;
};

const getServiceMap = async () => {
  if (cache.services) return cache.services;
  try {
    const res = await api.get("/Service/get-all");
    const map = new Map((res?.data?.result || []).map((s) => [s.id, s]));
    cache.services = map;
    return map;
  } catch {
    return new Map();
  }
};

const getShiftByShiftId = async (shiftId) => {
  if (!shiftId) return null;
  if (cache.shiftsById.has(shiftId)) return cache.shiftsById.get(shiftId);
  try {
    const res = await api.get("/shift/Get-all");
    const list = res?.data?.result || [];
    const shift = list.find((s) => s.id === shiftId) ?? null;
    cache.shiftsById.set(shiftId, shift);
    return shift;
  } catch {
    cache.shiftsById.set(shiftId, null);
    return null;
  }
};

const getDoctorById = async (doctorId) => {
  if (!doctorId) return null;
  if (cache.doctorsById.has(doctorId)) return cache.doctorsById.get(doctorId);
  try {
    const res = await api.get(`/doctor/doctor/${doctorId}`);
    const doctor = res?.data?.result ?? res?.data ?? null;
    cache.doctorsById.set(doctorId, doctor);
    return doctor;
  } catch {
    cache.doctorsById.set(doctorId, null);
    return null;
  }
};

const getPatientProjection = async (patientId) => {
  if (!patientId) return null;
  if (cache.patientsById.has(patientId)) return cache.patientsById.get(patientId);
  try {
    const p = await getPatientById(patientId);
    cache.patientsById.set(patientId, p);
    return p;
  } catch {
    cache.patientsById.set(patientId, null);
    return null;
  }
};

const enrichAppointments = async (appointments = []) => {
  if (!appointments.length) return appointments;

  const serviceMap = await getServiceMap();

  const shiftIds = [...new Set(appointments.map((a) => a.shiftId).filter(Boolean))];
  await Promise.all(shiftIds.map(getShiftByShiftId));

  const doctorIds = [
    ...new Set(
      shiftIds.map((sid) => cache.shiftsById.get(sid)?.doctorId).filter(Boolean)
    ),
  ];
  await Promise.all(doctorIds.map(getDoctorById));

  const patientIds = [...new Set(appointments.map((a) => a.patientId).filter(Boolean))];
  await Promise.all(patientIds.map(getPatientProjection));

  return appointments.map((a) => {
    const shift = cache.shiftsById.get(a.shiftId) ?? null;
    const doctor = shift ? cache.doctorsById.get(shift.doctorId) : null;
    const service = serviceMap.get(a.serviceId) ?? null;
    const patient = cache.patientsById.get(a.patientId) ?? null;

    return {
      ...a,
      patientName: patient?.fullName ?? patient?.full_name ?? null,
      doctorName: doctor?.fullName ?? doctor?.full_name ?? null,
      specialtyName: doctor?.specialtyName ?? null,
      serviceName: service?.name ?? null,
      shiftDate: formatYMDToDMY(shift?.shiftDate) ?? null,
      startAt: a.startAt || shift?.startTime || "",
      endAt: a.endAt || shift?.endTime || "",
    };
  });
};

// ─── Public APIs ──────────────────────────────────────────────────────────────
export const createAppointment = async (payload) => {
  const res = await api.post("/appointment/create", payload);
  return res?.data?.result ? normalizeAppointment(res.data.result) : null;
};

export const getAllAppointments = async ({ enrich = false } = {}) => {
  const res = await api.get("/appointment/Get-all");
  const list = (res?.data?.result || []).map(normalizeAppointment);
  return enrich ? enrichAppointments(list) : list;
};

export const getAppointmentsByPatient = async (patientId) => {
  const res = await api.get(`/appointment/Get-by-Patient/${patientId}`);
  const list = (res?.data?.result || []).map(normalizeAppointment);
  return enrichAppointments(list);
};

export const getAppointmentsByStatus = async (status, { enrich = false } = {}) => {
  const res = await api.get(`/appointment/Get-by-status/${status}`);
  const list = (res?.data?.result || []).map(normalizeAppointment);
  return enrich ? enrichAppointments(list) : list;
};

export const getAppointmentsByDoctor = async (doctorId, shiftDate) => {
  const res = await api.get(`/appointment/doctor/${doctorId}`, {
    params: shiftDate ? { shiftDate } : {},
  });
  return (res?.data?.result || []).map(normalizeAppointment);
};

export const updateAppointmentStatus = async (id, status) => {
  const res = await api.put(`/appointment/Update-status/${id}`, { status });
  return res?.data?.result ? normalizeAppointment(res.data.result) : null;
};

export const searchAppointments = async (request = {}) => {
  const res = await api.post("/appointment/Search", null, { params: { ...request } });
  return (res?.data?.result || []).map(normalizeAppointment);
};

export const getMedicalRecordByAppointment = async (appointment) => {
  const appointmentId = appointment?.id;
  if (!appointmentId) return null;

  if (cache.medicalRecords.has(appointmentId)) return cache.medicalRecords.get(appointmentId);

  const recordId = appointment?.medicalRecordId;
  if (!recordId) {
    cache.medicalRecords.set(appointmentId, null);
    return null;
  }

  try {
    const res = await api.get(`/Medical-Record/Get/${recordId}`);
    const record = res?.data?.result ? normalizeMedicalRecord(res.data.result) : null;
    cache.medicalRecords.set(appointmentId, record);
    return record;
  } catch {
    cache.medicalRecords.set(appointmentId, null);
    return null;
  }
};

export const clearAppointmentCache = () => {
  cache.services = null;
  cache.shiftsById.clear();
  cache.doctorsById.clear();
  cache.patientsById.clear();
  cache.medicalRecords.clear();
};