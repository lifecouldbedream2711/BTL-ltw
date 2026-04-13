import { useEffect, useState } from "react";
import TextInput from "../../components/input/textInput";
import SubButton from "../../components/button/SubButton";
import {
  getPatientById,
  updatePatient,
} from "../../service/patientApi";
import { getUser } from "../../service/authStorage";
export default function EditProfile() {
  // Giả lập ID người dùng (sau này lấy từ JWT hoặc Context)
  const patientId = getUser()?.id;

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    allergies: "",
    medical_history: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Lấy thông tin bệnh nhân khi component được load
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const data = await getPatientById(patientId);
        if (data) {
          setFormData({
            full_name: data.fullName || "",
            email: data.email || "",
            phone: data.phone || "",
            dob: data.dob || "",
            gender: data.gender || "",
            address: data.address || "",
            allergies: data.allergies || "",
            medical_history: data.medicalHistory || "",
            password: "",
          });
        }
      } catch (error) {
        console.error("Error fetching patient:", error);
      }
    };

    if (patientId) {
      fetchPatient();
    }
  }, [patientId]);

  // Xử lý thay đổi dữ liệu
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Xử lý submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        phone: formData.phone,
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password || "123456",
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        allergies: formData.allergies,
        medical_history: formData.medical_history,
      };

      await updatePatient(patientId, payload);
      setMessage("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error("Update failed:", error);
      setMessage("Cập nhật thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen p-6">
      <div>
        <p className="text-4xl mb-2 font-medium">Edit Profile</p>
        <p className="opacity-55">
          Update and manage your personal information
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex mt-6 space-x-20 flex-wrap"
      >
        <div className="w-[35%]">
          <label>Name:</label>
          <TextInput
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Email:</label>
          <TextInput
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Phone:</label>
          <TextInput
            id="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Date of Birth:</label>
          <TextInput
            id="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Gender:</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg"
          >
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>

        <div className="w-[35%]">
          <label>Address:</label>
          <TextInput
            id="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Allergies:</label>
          <TextInput
            id="allergies"
            value={formData.allergies}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Medical History:</label>
          <TextInput
            id="medical_history"
            value={formData.medical_history}
            onChange={handleChange}
          />
        </div>

        <div className="w-[35%]">
          <label>Password:</label>
          <TextInput
            id="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />
        </div>

        <div className="w-full mt-4">
          <SubButton
            text={loading ? "Updating..." : "Save Changes"}
            type="submit"
          />
        </div>

        {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )}
      </form>
    </div>
  );
}