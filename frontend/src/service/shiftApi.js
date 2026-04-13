import api from "./apiconfig";

const normalizeShift = (s = {}) => ({
  ...s,
  doctorId: s?.doctorId ?? "",
  shiftDate: s?.shiftDate ?? "",
  startTime: s?.startTime ?? "",
  endTime: s?.endTime ?? "",
  slotMin: s?.slotMin ?? 15,
  maxPatients: s?.maxPatients ?? 1,
  note: s?.note ?? "",
});

// Tạo 1 ca
export const createShift = async (payload) => {
  const res = await api.post("/shift/create", payload);
  return res?.data?.result ? normalizeShift(res.data.result) : null;
};

// Tạo nhiều ca
export const createManyShifts = async (payloadList = []) => {
  const res = await api.post("/shift/Create-many", payloadList);
  return (res?.data?.result || []).map(normalizeShift);
};

// Lấy toàn bộ ca
export const getAllShifts = async () => {
  const res = await api.get("/shift/Get-all");
  return (res?.data?.result || []).map(normalizeShift);
};

// Lấy ca theo doctorId
export const getDoctorShifts = async (doctorId) => {
  const res = await api.get(`/shift/Get/${doctorId}`);
  return (res?.data?.result || []).map(normalizeShift);
};

// Tìm ca để đặt lịch
export const findShiftToBook = async ({ doctorId, shiftDate }) => {
  const res = await api.post("/shift/Find-to-book", { doctorId, shiftDate });
  return (res?.data?.result || []).map(normalizeShift);
};

// Tìm slot trống
export const findShiftSlots = async ({ doctorId, shiftDate }) => {
  const res = await api.post("/shift/Find-slot", { doctorId, shiftDate });
  return res?.data?.result || [];
};
export const getShiftsByDoctor = async (doctorId) => {
  const res = await api.get(`/shift/Get-by-Doctor/${doctorId}`);
  return res?.data?.result || [];
};
// NEW
export const turnOnShift = async (id) => {
  const res = await api.patch(`/shift/Turn-on/${id}`);
  return res?.data?.result ?? null;
};

export const turnOffShift = async (id) => {
  const res = await api.patch(`/shift/Turn-off/${id}`);
  return res?.data?.result ?? null;
};