import icon from "../../assets/icon.png";
import TextInput from "../../components/input/textInput";
import SelectInput from "../../components/input/selectInput";
import SubButton from "../../components/button/SubButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPatient } from "../../service/patientApi";

const Gender = ["MALE", "FEMALE", "OTHER"];

export default function Regist() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "MALE",
    address: "",
    password: "",
    confirmPassword: "",
    allergies: "",
    medical_history: ""
  });

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value ?? "" }));
  };

  const normalizeDob = (raw) => {
    if (!raw) return "";
    const v = String(raw).trim();

    // yyyy-mm-dd
    if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

    // dd/mm/yyyy
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(v)) {
      const [dd, mm, yyyy] = v.split("/");
      return `${yyyy}-${mm}-${dd}`;
    }

    return "";
  };

  const logFormData = (dobNormalized) => {
    console.log("=== REGISTER FORM DATA ===");
    console.table(form);
    console.log("RAW DOB:", form.dob);
    console.log("DOB NORMALIZED:", dobNormalized);
  };

  const handleSubmit = async () => {
    try {
      setErr("");

      const dobNormalized = normalizeDob(form.dob);
      logFormData(dobNormalized);

      if (
        !form.full_name.trim() ||
        !form.email.trim() ||
        !form.phone.trim() ||
        !dobNormalized ||
        !form.gender.trim() ||
        !form.address.trim() ||
        !form.password
      ) {
        setErr("Vui lòng nhập đầy đủ thông tin bắt buộc");
        return;
      }

      if (form.password !== form.confirmPassword) {
        setErr("Mật khẩu xác nhận không khớp");
        return;
      }

      setLoading(true);

      const payload = {
        phone: form.phone.trim(),
        full_name: form.full_name.trim(),
        email: form.email.trim(),
        password: form.password,
        dob: dobNormalized,
        gender: form.gender.toUpperCase(),
        address: form.address.trim(),
        allergies: form.allergies.trim() || "None",
        medical_history: form.medical_history.trim() || "No significant history"
      };

      await createPatient(payload);
      alert("Tạo tài khoản thành công! Vui lòng đăng nhập.");
      navigate("/");
    } catch (e) {
      setErr(e?.response?.data?.message || "Tạo tài khoản thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#C7EBEE] min-h-screen w-screen flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl p-6">
        <img src={icon} alt="" className="w-14 h-auto mx-auto my-2" />
        <p className="text-center text-2xl text-[#0EA4B5] font-semibold">Create Account</p>
        <p className="text-center text-[16px] opacity-50 mb-4">
          Register for a new patient account
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="full-name">Full name</label>
            <TextInput
              id="full-name"
              placeholder="Phùng Thanh Độ"
              value={form.full_name}
              onChange={(e) => onChange("full_name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email <br /></label>
            <TextInput
              id="email"
              placeholder="abc@gmail.com"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <TextInput
              id="phone"
              placeholder="0363636363"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
          </div>

          {/* Dùng input date native để chắc chắn nhận value */}
          <div>
            <label htmlFor="dob">Date of Birth</label>
            <input
              id="dob"
              type="date"
              className="w-[90%] border rounded-md border-gray-500 px-3 py-2"
              value={form.dob}
              onChange={(e) => onChange("dob", e.target.value)}
            />
          </div>

          <div>
            <label>Gender</label>
            <SelectInput
              Options={Gender}
              value={form.gender}
              onChange={(e) =>
                onChange("gender", e?.target ? e.target.value : e)
              }
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <TextInput
              id="address"
              placeholder="120 Yên Lãng"
              value={form.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <TextInput
              id="password"
              type="password"
              placeholder="*******"
              value={form.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="confirm-password">Confirm password</label>
            <TextInput
              id="confirm-password"
              type="password"
              placeholder="*******"
              value={form.confirmPassword}
              onChange={(e) => onChange("confirmPassword", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="allergies">Allergies</label>
            <TextInput
              id="allergies"
              placeholder="None"
              value={form.allergies}
              onChange={(e) => onChange("allergies", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="medical_history">Medical history</label>
            <TextInput
              id="medical_history"
              placeholder="No significant history"
              value={form.medical_history}
              onChange={(e) => onChange("medical_history", e.target.value)}
            />
          </div>
        </div>

        {err && <p className="text-red-500 text-sm mt-3">{err}</p>}

        <div className="flex justify-center">
          <SubButton
            text={loading ? "Creating..." : "Create account"}
            className="mt-5 w-[80%]"
            onClick={handleSubmit}
            disabled={loading}
          />
        </div>

        <div className="text-center mt-3">
          <span>Already have an account? </span>
          <Link to="/" className="text-[#0EA4B5] underline">
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}