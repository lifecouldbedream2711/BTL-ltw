import { useEffect, useMemo, useState } from "react";
import SubButton from "../../components/button/SubButton";
import ManageServiceCard from "../../components/card/ManaService";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../../service/serviceApi";
import { getAllSpecialties } from "../../service/specialtyApi";

function ServiceModal({ open, onClose, onSubmit, initialData, specialties, loading }) {
  const [form, setForm] = useState({
    specialtyId: "",
    name: "",
    description: "",
    price: "",
    durationMin: "",
    active: true,
  });

  useEffect(() => {
    if (!open) return;
    setForm({
      specialtyId: initialData?.specialtyId || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price ?? "",
      durationMin: initialData?.durationMin ?? "",
      active: typeof initialData?.active === "boolean" ? initialData.active : true,
    });
  }, [open, initialData]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({
      specialtyId: form.specialtyId,
      name: form.name,
      description: form.description,
      price: Number(form.price),
      durationMin: Number(form.durationMin),
      active: !!form.active,
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl p-5">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">{initialData ? "Update Service" : "Add Service"}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select className="border rounded px-3 py-2 md:col-span-2" value={form.specialtyId}
            onChange={(e) => setForm((p) => ({ ...p, specialtyId: e.target.value }))} required>
            <option value="">-- Select Specialty --</option>
            {specialties.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Service name"
            value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <textarea className="border rounded px-3 py-2 md:col-span-2" rows={3} placeholder="Description"
            value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
          <input className="border rounded px-3 py-2" type="number" min="0" placeholder="Price"
            value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
          <input className="border rounded px-3 py-2" type="number" min="1" placeholder="Duration (min)"
            value={form.durationMin} onChange={(e) => setForm((p) => ({ ...p, durationMin: e.target.value }))} required />
          <label className="md:col-span-2 flex items-center gap-2">
            <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} />
            Active
          </label>
          <div className="md:col-span-2 flex justify-end gap-2">
            <button type="button" className="border px-4 py-2 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading} className="bg-[#0EA4B5] text-white px-4 py-2 rounded">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const specialtyMap = useMemo(() => {
    const m = new Map();
    specialties.forEach((s) => m.set(s.id, s.name));
    return m;
  }, [specialties]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [svs, sps] = await Promise.all([getAllServices(), getAllSpecialties()]);
      setServices(Array.isArray(svs) ? svs : []);
      setSpecialties(Array.isArray(sps) ? sps : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSave = async (payload) => {
    setSaving(true);
    try {
      if (editing?.id) await updateService(editing.id, payload);
      else await createService(payload);
      setOpenModal(false);
      setEditing(null);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Save service failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await deleteService(id);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Delete service failed");
    }
  };

  return (
    <div>
      <div className="float-right w-50 p-4">
        <SubButton onClick={() => { setEditing(null); setOpenModal(true); }}>
          <i className="fa-solid fa-plus pr-1"></i> Add Service
        </SubButton>
      </div>
      <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
      <p className="text-gray-600">Create and manage services in the system.</p>

      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-6 flex flex-wrap gap-6">
          {services.map((service) => (
            <ManageServiceCard
              key={service.id}
              service={service}
              specialtyName={specialtyMap.get(service.specialtyId) || "Specialty"}
              onEdit={() => { setEditing(service); setOpenModal(true); }}
              onDelete={() => handleDelete(service.id)}
            />
          ))}
        </div>
      )}

      <ServiceModal
        open={openModal}
        onClose={() => { setOpenModal(false); setEditing(null); }}
        onSubmit={handleSave}
        initialData={editing}
        specialties={specialties}
        loading={saving}
      />
    </div>
  );
}