import api from "./apiconfig";

export const createSpecialty = async (payload) => {
  const res = await api.post("/Specialty/create", payload);
  return res?.data?.result || null;
};

export const updateSpecialty = async (id, payload) => {
  const res = await api.put(`/Specialty/Update/${id}`, payload);
  return res?.data?.result || null;
};

export const deleteSpecialty = async (id) => {
  const res = await api.delete(`/Specialty/Delete/${id}`);
  return res?.data?.result ?? null;
};

export const getAllSpecialties = async () => {
  const res = await api.get("/Specialty/get-all");
  return res?.data?.result || [];
};

export const getAllSpecialtySummary = async () => {
  // endpoint GET trong spec có path hơi lỗi spacing, dùng search fallback ổn định
  const res = await api.post("/Specialty/Specialty/get-by-name", { name: "a" });
  return res?.data?.result || [];
};

export const searchSpecialtyByName = async (name) => {
  const keyword = (name || "").trim();
  if (!keyword) return getAllSpecialtySummary();

  const res = await api.post("/Specialty/Specialty/get-by-name", { name: keyword });
  return res?.data?.result || [];
};

export const addDoctorToSpecialty = async (request) => {
  const res = await api.put("/Specialty/add-doctor", null, { params: { request } });
  return res?.data?.result || null;
};

export const addManyDoctorToSpecialty = async (payloadList = []) => {
  const res = await api.put("/Specialty/add-many-doctor", payloadList);
  return res?.data?.result || [];
};