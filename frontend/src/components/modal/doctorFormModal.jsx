import { useEffect, useState } from "react";

export default function EditDoctorModal({
  open,
  doctor,
  onClose,
  onSubmit,
  specialties = [],
  loading = false,
}) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    password_hash: "",
    license_no: "",
    bio: "",
    specialtyId: "",
  });

  useEffect(() => {
    if (!open || !doctor) return;
    setForm({
      full_name: doctor?.fullName || doctor?.full_name || "",
      phone: doctor?.phone || "",
      email: doctor?.email || "",
      password_hash: doctor?.passwordHash || doctor?.password_hash || "",
      license_no: doctor?.licenseNo || doctor?.license_no || "",
      bio: doctor?.bio || "",
      specialtyId: doctor?.specialtyId || "",
    });
  }, [open, doctor]);

  if (!open) return null;

  const handleChange = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Update Doctor</h3>
          <button onClick={onClose} className="text-gray-500 text-xl">×</button>
        </div>

        {/* Không có ô ID */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Full name"
            value={form.full_name} onChange={(e) => handleChange("full_name", e.target.value)} required />
          <input className="border rounded px-3 py-2" placeholder="Phone"
            value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
          <input className="border rounded px-3 py-2" placeholder="Email"
            value={form.email} onChange={(e) => handleChange("email", e.target.value)} required />
          <input className="border rounded px-3 py-2" placeholder="License No"
            value={form.license_no} onChange={(e) => handleChange("license_no", e.target.value)} required />
          <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Password (leave as is if unchanged)"
            value={form.password_hash} onChange={(e) => handleChange("password_hash", e.target.value)} />

          <select
            className="border rounded px-3 py-2 md:col-span-2"
            value={form.specialtyId}
            onChange={(e) => handleChange("specialtyId", e.target.value)}
            required
          >
            <option value="">-- Select Specialty --</option>
            {specialties.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <textarea className="border rounded px-3 py-2 md:col-span-2" rows={3} placeholder="Bio"
            value={form.bio} onChange={(e) => handleChange("bio", e.target.value)} />

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}
              className="px-4 py-2 bg-[#0EA4B5] text-white rounded disabled:opacity-60">
              {loading ? "Saving..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}