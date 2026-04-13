import api from "./apiconfig";

const normalizeDoctor = (d = {}) => ({
  ...d,
  fullName: d?.full_name ?? d?.fullName ?? "",
  licenseNo: d?.license_no ?? d?.licenseNo ?? "",
  passwordHash: d?.password_hash ?? d?.passwordHash ?? "",
});

export const getAllDoctors = async () => {
  const res = await api.get("/doctor/Get-all");
  return (res?.data?.result || []).map(normalizeDoctor);
};

export const getDoctorById = async (id) => {
  const res = await api.get(`/doctor/doctor/${id}`);
  const doctor = res?.data?.result || null;
  return doctor ? normalizeDoctor(doctor) : null;
};

export const getDoctorBySpecialty = async (specialtyId) => {
  const res = await api.post(`/doctor/Get-by-specialty/${specialtyId}`);
  return (res?.data?.result || []).map(normalizeDoctor);
};

export const searchDoctorsByName = async (name) => {
  const res = await api.post("/doctor/Find-by-name", { name: (name || "").trim() || "a" });
  return (res?.data?.result || []).map(normalizeDoctor);
};

export const createDoctor = async (payload) => {
  const res = await api.post("/doctor/Create", payload);
  return res?.data?.result ? normalizeDoctor(res.data.result) : null;
};

export const createManyDoctors = async (doctorList = []) => {
  const res = await api.post("/doctor/Create-many", { doctorList });
  return (res?.data?.result || []).map(normalizeDoctor);
};

export const updateDoctor = async (id, payload) => {
  const res = await api.put(`/doctor/update/${id}`, payload);
  return res?.data?.result ? normalizeDoctor(res.data.result) : null;
};