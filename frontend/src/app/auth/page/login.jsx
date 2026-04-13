import imgLog from "../../../assets/log.png";
import icon from "../../../assets/icon.png";
import TextInput from "../../../components/input/textInput";
import SubButton from "../../../components/button/SubButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../../../service/authAPI";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setErr("Vui lòng nhập email và mật khẩu");
        return;
      }

      setErr("");
      setLoading(true);

      const data = await login({ email, password });

      // lấy token từ response (đổi key nếu backend bạn khác)
      const token =
        data?.result?.token ||
        data?.token ||
        data?.result?.accessToken ||
        data?.accessToken;

      if (!token) {
        setErr("Không nhận được token");
        return;
      }

      // decode JWT payload
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload?.scope || payload?.role; // backend bạn đang claim("scope", role)
      const userId = payload?.userId;
      const userEmail = payload?.sub; // subject = email

      // lưu local
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ id: userId, role, email: userEmail })
      );

      if (role === "ADMIN") navigate("/admin");
      else if (role === "DOCTOR") navigate("/doctor");
      else navigate("/patient");
    } catch (e) {
      setErr(e?.response?.data?.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#C7EBEE] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#EBF2F4] h-[80%] w-[80%] rounded-2xl flex items-center ">
        <img src={imgLog} alt="logo" className="w-[55%] h-auto mr-[8%]" />
        <div className="bg-white w-[33%] h-[85%] rounded-md shadow-2xl">
          <div className="p-5 w-full h-auto ">
            <img src={icon} alt="" className="w-[20%] h-auto mx-auto mt-10" />
            <div className="font-bold text-2xl text-center text-[#0EA4B5]">Welcome back</div>
            <p className="text-center opacity-40">sign in to your account to continue</p>

            <div className="mt-2 ml-[5%]">
              <div className="w-full">
                <label htmlFor="Email" className="font-medium">Email</label>
                <TextInput
                  id="Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="Password" className="font-medium">Mật khẩu</label>
              <TextInput
                id="Password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {err && <p className="text-red-500 text-sm mt-2">{err}</p>}

              <SubButton
                text={loading ? "Signing in..." : "Sign in"}
                className="mt-4"
                onClick={handleLogin}
                disabled={loading}
              />

              <div className="text-center mt-5">
                <span>Chưa có tài khoản ? </span>
                <a href="/regist" className="text-[#0EA4B5] underline">Đăng ký</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}