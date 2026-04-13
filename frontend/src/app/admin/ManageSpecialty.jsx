import { useEffect, useState } from "react";
import SubButton from "../../components/button/SubButton";
import ManageSpecialtyCard from "../../components/card/ManaSpecialty";
import {
  getAllSpecialties,
  createSpecialty,
  updateSpecialty,
  deleteSpecialty,
} from "../../service/specialtyApi";

function SpecialtyModal({ open, onClose, onSubmit, initialData, loading }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!open) return;
    setName(initialData?.name || "");
    setDescription(initialData?.description || "");
  }, [open, initialData]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit({ name, description });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-xl rounded-xl p-5">
        <div className="flex justify-between mb-3">
          <h3 className="text-lg font-semibold">{initialData ? "Update Specialty" : "Add Specialty"}</h3>
          <button onClick={onClose}>×</button>
        </div>
        <form onSubmit={submit} className="space-y-3">
          <input className="border rounded px-3 py-2 w-full" placeholder="Specialty name"
            value={name} onChange={(e) => setName(e.target.value)} required />
          <textarea className="border rounded px-3 py-2 w-full" rows={4} placeholder="Description"
            value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex justify-end gap-2">
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

export default function ManageSpecialty() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getAllSpecialties();
      setSpecialties(Array.isArray(data) ? data : []);
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
      if (editing?.id) await updateSpecialty(editing.id, payload);
      else await createSpecialty(payload);
      setOpenModal(false);
      setEditing(null);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Save specialty failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this specialty?")) return;
    try {
      await deleteSpecialty(id);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Delete specialty failed");
    }
  };

  return (
    <div>
      <div className="float-right w-50 p-4">
        <SubButton onClick={() => { setEditing(null); setOpenModal(true); }}>
          <i className="fa-solid fa-plus pr-1"></i> Add Specialty
        </SubButton>
      </div>
      <h1 className="text-2xl font-bold mb-4">Manage Specialties</h1>
      <p className="text-gray-600">Create and manage specialties in the system.</p>

      {loading ? <p className="mt-4">Loading...</p> : (
        <div className="mt-6 flex flex-wrap gap-6">
          {specialties.map((specialty) => (
            <ManageSpecialtyCard
              key={specialty.id}
              specialty={specialty}
              onEdit={() => { setEditing(specialty); setOpenModal(true); }}
              onDelete={() => handleDelete(specialty.id)}
            />
          ))}
        </div>
      )}

      <SpecialtyModal
        open={openModal}
        onClose={() => { setOpenModal(false); setEditing(null); }}
        onSubmit={handleSave}
        initialData={editing}
        loading={saving}
      />
    </div>
  );
}