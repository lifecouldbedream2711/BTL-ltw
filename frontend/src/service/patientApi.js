import api from "./apiconfig";

const normalizePatient = (p = {}) => ({
  ...p,
  fullName: p?.full_name ?? p?.fullName ?? "",
  passwordHash: p?.password_hash ?? "",
  medicalHistory: p?.medical_history ?? p?.medicalHistory ?? "",
});

export const createPatient = async (payload) => {
  const res = await api.post("/patient/create", payload);
  return res?.data?.result ? normalizePatient(res.data.result) : null;
};

export const createManyPatients = async (patientList = []) => {
  const res = await api.post("/patient/Create-many", { patientList });
  return (res?.data?.result || []).map(normalizePatient);
};

export const getAllPatients = async () => {
  const res = await api.get("/patient/Get-all");
  return (res?.data?.result || []).map(normalizePatient);
};

export const getPatientById = async (id) => {
  const res = await api.get(`/patient/patient/${id}`);
  // endpoint này có thể trả projection trực tiếp
  const data = res?.data?.result ?? res?.data;
  return data ? normalizePatient(data) : null;
};

export const updatePatient = async (id, payload) => {
  const res = await api.put(`/patient/Update/${id}`, payload);
  return res?.data?.result ? normalizePatient(res.data.result) : null;
};