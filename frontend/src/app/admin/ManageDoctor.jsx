import { useEffect, useMemo, useState } from "react";
import ManageDoctorCard from "../../components/card/manaDoctor";
import SubButton from "../../components/button/SubButton";
import AddDoctorModal from "../../components/modal/addDoctorModal";
import EditDoctorModal from "../../components/modal/doctorFormModal";
import { createDoctor, getAllDoctors, updateDoctor } from "../../service/doctorApi";
import { getAllSpecialties } from "../../service/specialtyApi";

export default function ManageDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [saving, setSaving] = useState(false);

  const specialtyMap = useMemo(() => {
    const m = new Map();
    specialties.forEach((s) => m.set(s.id, s.name));
    return m;
  }, [specialties]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [doctorList, specialtyList] = await Promise.all([
        getAllDoctors(),
        getAllSpecialties(),
      ]);
      setDoctors(Array.isArray(doctorList) ? doctorList : []);
      setSpecialties(Array.isArray(specialtyList) ? specialtyList : []);
    } catch {
      setError("Không tải được danh sách bác sĩ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (form) => {
    setSaving(true);
    try {
      await createDoctor({
        phone: form.phone,
        full_name: form.full_name,
        email: form.email,
        password_hash: form.password_hash,
        license_no: form.license_no,
        bio: form.bio,
        specialtyId: form.specialtyId,
      });
      setOpenAdd(false);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Create doctor failed");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (form) => {
    if (!editingDoctor?.id) return;
    setSaving(true);
    try {
      await updateDoctor(editingDoctor.id, {
        phone: form.phone,
        full_name: form.full_name,
        email: form.email,
        password_hash: form.password_hash || "",
        license_no: form.license_no,
        bio: form.bio,
        specialtyId: form.specialtyId,
      });
      setOpenEdit(false);
      setEditingDoctor(null);
      await loadData();
    } catch (e) {
      alert(e?.response?.data?.message || "Update doctor failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold">Manage Doctors</h1>
          <p className="text-gray-600">Create and manage doctors in the system.</p>
        </div>
        <div className="w-44">
          <SubButton onClick={() => setOpenAdd(true)}>
            <i className="fa-solid fa-user-plus pr-1"></i> Add Doctor
          </SubButton>
        </div>
      </div>

      {loading && <p>Loading doctors...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="mt-6">
          {doctors.map((doctor) => (
            <ManageDoctorCard
              key={doctor.id}
              doctor={doctor}
              specialtyName={specialtyMap.get(doctor.specialtyId) || doctor.specialtyName || "Chưa phân khoa"}
              onEdit={() => {
                setEditingDoctor(doctor);
                setOpenEdit(true);
              }}
              onToggleActive={() => alert("API active/inactive chưa có trong swagger")}
            />
          ))}
        </div>
      )}

      <AddDoctorModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        specialties={specialties}
        onSubmit={handleCreate}
        loading={saving}
      />

      <EditDoctorModal
        open={openEdit}
        doctor={editingDoctor}
        onClose={() => {
          setOpenEdit(false);
          setEditingDoctor(null);
        }}
        specialties={specialties}
        onSubmit={handleUpdate}
        loading={saving}
      />
    </div>
  );
}