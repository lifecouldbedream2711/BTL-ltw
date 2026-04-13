import api from "./apiconfig";

export const getAllServices = async () => {
  const res = await api.get("/Service/get-all");
  return res?.data?.result || [];
};

export const createService = async (payload) => {
  const res = await api.post("/Service/create", payload);
  return res?.data?.result || null;
};

export const createManyServices = async (payloadList = []) => {
  const res = await api.post("/Service/create-many", payloadList);
  return res?.data?.result || [];
};

export const updateService = async (id, payload) => {
  const res = await api.put(`/Service/Update/${id}`, payload);
  return res?.data?.result || null;
};

export const deleteService = async (id) => {
  const res = await api.delete(`/Service/Delete/${id}`);
  return res?.data?.result ?? null;
};

export const searchServicesByKey = async ({
  specialtyId = null,
  keyword = null,
  minPrice = null,
  maxPrice = null,
  minDuration = null,
  maxDuration = null,
  active = null,
} = {}) => {
  const payload = {
    specialtyId,
    keyword: keyword?.trim() || null,
    minPrice: minPrice === "" || minPrice == null ? null : Number(minPrice),
    maxPrice: maxPrice === "" || maxPrice == null ? null : Number(maxPrice),
    minDuration: minDuration === "" || minDuration == null ? null : Number(minDuration),
    maxDuration: maxDuration === "" || maxDuration == null ? null : Number(maxDuration),
    active: typeof active === "boolean" ? active : null,
  };

  const res = await api.post("/Service/find-by-key", payload);
  return res?.data?.result || [];
};