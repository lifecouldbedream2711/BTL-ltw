import imgLog from "../../../assets/log.png";
import icon from "../../../assets/icon.png";
import TextInput from "../../../components/input/textInput";
import SubButton from "../../../components/button/SubButton";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#C7EBEE] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#EBF2F4] h-[80%] w-[80%] rounded-2xl flex items-center ">
        <img src={imgLog} alt="logo" className="w-[55%] h-auto mr-[8%]" />
        <div className="bg-white w-[33%] h-[85%] rounded-md shadow-2xl">
          <div className="p-5 w-full h-auto ">
            <img src={icon} alt="" className="w-[20%] h-auto mx-auto mt-10" />
            <div className="font-bold  text-2xl text-center text-[#0EA4B5]">Welcome back</div>
            <p className="text-center opacity-40">sign in to your account to countine</p>
            <div className="mt-2 ml-[5%] ">
              <div className="w-full">
              <label htmlFor="Phone" className="font-medium">Số điện thoại</label>
              <TextInput
                id="Phone"
                placeholder="Phone"
              />
              </div>
              <label htmlFor="Password"  className="font-medium">Mật khẩu</label>
              <TextInput
                id="Password"
                placeholder="Password"
              />
              <SubButton text="Sign in" className="mt-4" onClick={() => navigate("/patient")}/>
              <div className="text-center mt- 5">
                <span>Chưa có tài khoản ? </span>
                <a href="/regist" on className=" text-[#0EA4B5] underline" >Đăng ký</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}