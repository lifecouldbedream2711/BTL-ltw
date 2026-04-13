import api from "./apiconfig";

export const getTopDoctors = async () => {
  const res = await api.get("/Dashboard/dashboard/top-doctors");
  return res?.data || [];
};

export const getPatientStats = async () => {
  const res = await api.get("/Dashboard/dashboard/patients");
  return res?.data?.result || null;
};

export const getAppointmentStatusCount = async () => {
  const res = await api.get("/Dashboard/appointments/status-count");
  return res?.data?.result || [];
};

export const getAllQuantity = async () => {
  const res = await api.get("/Dashboard/Get-all");
  return res?.data?.result || null;
};