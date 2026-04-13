import { useEffect, useMemo, useState } from "react";
import SubButton from "../../components/button/SubButton";
import ManageShiftCard from "../../components/card/ManaShift";
import { createShift, getAllShifts, turnOnShift, turnOffShift } from "../../service/shiftApi";
import { getAllDoctors, getDoctorById } from "../../service/doctorApi";
import { getAllSpecialties } from "../../service/specialtyApi";

function ShiftModal({ open, onClose, onSubmit, doctors = [], loading = false }) {
  const [form, setForm] = useState({
    doctorId: "",
    shiftDate: "",
    startTime: "08:00",
    endTime: "12:00",
    slotMin: 15,
    maxPatients: 10,
    note: "",
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      doctorId: "",
      shiftDate: "",
      startTime: "08:00",
      endTime: "12:00",
      slotMin: 15,
      maxPatients: 10,
      note: "",
    });
  }, [open]);

  if (!open) return null;

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const submit = (e) => {
    e.preventDefault();
    onSubmit?.({
      doctorId: form.doctorId,
      shiftDate: form.shiftDate,
      startTime: form.startTime,
      endTime: form.endTime,
      slotMin: Number(form.slotMin),
      maxPatients: Number(form.maxPatients),
      note: form.note,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Add Shift</h3>
          <button onClick={onClose} className="text-xl text-gray-500">×</button>
        </div>

        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            className="border rounded px-3 py-2 md:col-span-2"
            value={form.doctorId}
            onChange={(e) => setField("doctorId", e.target.value)}
            required
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.id}>
                {(d.fullName || d.full_name) ?? "Doctor"} ({d.email})
              </option>
            ))}
          </select>

          <input type="date" className="border rounded px-3 py-2"
            value={form.shiftDate} onChange={(e) => setField("shiftDate", e.target.value)} required />
          <input type="number" min={1} className="border rounded px-3 py-2"
            value={form.maxPatients} onChange={(e) => setField("maxPatients", e.target.value)} required />

          <input type="time" className="border rounded px-3 py-2"
            value={form.startTime} onChange={(e) => setField("startTime", e.target.value)} required />
          <input type="time" className="border rounded px-3 py-2"
            value={form.endTime} onChange={(e) => setField("endTime", e.target.value)} required />

          <input type="number" min={5} step={5} className="border rounded px-3 py-2 md:col-span-2"
            value={form.slotMin} onChange={(e) => setField("slotMin", e.target.value)} required />

          <textarea className="border rounded px-3 py-2 md:col-span-2" rows={3}
            placeholder="Note" value={form.note} onChange={(e) => setField("note", e.target.value)} />

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-[#0EA4B5] text-white rounded disabled:opacity-60">
              {loading ? "Saving..." : "Create Shift"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageShifts() {
  const [specialties, setSpecialties] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [doctorMapById, setDoctorMapById] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [togglingId, setTogglingId] = useState("");
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const doctorOptions = useMemo(() => doctors, [doctors]);

  const specialtyMap = useMemo(() => {
    const m = new Map();
    specialties.forEach((s) => m.set(s.id, s.name));
    return m;
  }, [specialties]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [shiftList, doctorList, specialtyList] = await Promise.all([
        getAllShifts(),
        getAllDoctors(),
        getAllSpecialties(),
      ]);

      const allShifts = Array.isArray(shiftList) ? shiftList : [];
      const allDoctors = Array.isArray(doctorList) ? doctorList : [];
      const allSpecialties = Array.isArray(specialtyList) ? specialtyList : [];

      setDoctors(allDoctors);
      setSpecialties(allSpecialties);

      // Chỉ lấy từ hôm nay trở đi
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const upcomingShifts = allShifts
        .filter((s) => {
          if (!s?.shiftDate) return false;
          const d = new Date(`${s.shiftDate}T00:00:00`);
          return d >= today;
        })
        .sort((a, b) => {
          if (a.shiftDate !== b.shiftDate) return a.shiftDate.localeCompare(b.shiftDate);
          return (a.startTime || "").localeCompare(b.startTime || "");
        });

      setShifts(upcomingShifts);

      // lấy doctor detail để chắc chắn có specialtyName/fullName
      const doctorIds = [...new Set(upcomingShifts.map((s) => s?.doctorId).filter(Boolean))];
      const detailList = await Promise.all(
        doctorIds.map(async (id) => {
          try {
            return await getDoctorById(id);
          } catch {
            return null;
          }
        })
      );

      const map = {};
      detailList.filter(Boolean).forEach((d) => {
        map[d.id] = d;
      });
      setDoctorMapById(map);
    } catch {
      setError("Không tải được dữ liệu ca làm.");
      setShifts([]);
      setDoctors([]);
      setSpecialties([]);
      setDoctorMapById({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateShift = async (payload) => {
    setSaving(true);
    try {
      await createShift(payload);
      setOpenModal(false);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Tạo ca làm thất bại");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleShift = async (shift) => {
    setTogglingId(shift.id);
    try {
      if (shift?.bookable) await turnOffShift(shift.id);
      else await turnOnShift(shift.id);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Đổi trạng thái ca thất bại");
    } finally {
      setTogglingId("");
    }
  };

  return (
    <div>
      <div className="float-right w-50 p-4">
        <SubButton onClick={() => setOpenModal(true)}>
          <i className="fa-solid fa-plus pr-1"></i> Add Shift
        </SubButton>
      </div>

      <h1 className="text-2xl font-bold mb-4">Manage Shifts</h1>
      <p className="text-gray-600">Create and manage shifts in the system.</p>

      {loading && <p className="mt-4">Loading shifts...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-6 flex flex-wrap gap-6">
          {shifts.length === 0 ? (
            <p className="text-gray-500">Không có ca hiện tại / tương lai.</p>
          ) : (
            shifts.map((shift) => {
              const doctor = doctorMapById[shift.doctorId];
              const doctorName =
                doctor?.fullName ||
                doctor?.full_name ||
                doctors.find((d) => d.id === shift.doctorId)?.fullName ||
                doctors.find((d) => d.id === shift.doctorId)?.full_name ||
                "Bác sĩ";

              const specialtyName =
                doctor?.specialtyName ||
                specialtyMap.get(doctor?.specialtyId) ||
                specialtyMap.get(doctors.find((d) => d.id === shift.doctorId)?.specialtyId) ||
                "Chưa có khoa";

              return (
                <ManageShiftCard
                  key={shift.id}
                  shift={shift}
                  doctorName={doctorName}
                  specialtyName={specialtyName}
                  onToggleOpen={() => handleToggleShift(shift)}
                  toggling={togglingId === shift.id}
                />
              );
            })
          )}
        </div>
      )}

      <ShiftModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={handleCreateShift}
        doctors={doctorOptions}
        loading={saving}
      />
    </div>
  );
}