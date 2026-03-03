import imgLog from "../../../assets/log.png";
import icon from "../../../assets/icon.png";
import TextInput from "../../../components/input/textInput";
import SubButton from "../../../components/button/SubButton";

export default function Login() {
  return (
    <div className="bg-[#C7EBEE] h-screen w-screen flex items-center justify-center">
      <div className="bg-[#EBF2F4] h-[80%] w-[80%] rounded-2xl flex items-center ">
        <img src={imgLog} alt="logo" className="w-[55%] h-auto mr-[8%]" />
        <div className="bg-white w-[33%] h-[85%] rounded-md shadow-2xl">
          <div className="p-5 w-full h-auto ">
            <img src={icon} alt="" className="w-[20%] h-auto mx-auto mt-10" />
            <div className="font-bold  text-3xl text-center text-[#0EA4B5]">Login</div>
            <div className="mt-5 ml-[5%] ">
              <div>
              <label htmlFor="Phone">Số điện thoại</label>
              <TextInput
                id="Phone"
                placeholder="Phone"
              />
              </div>
              <label htmlFor="Password">Mật khẩu</label>
              <TextInput
                id="Password"
                placeholder="Password"
              />
              <SubButton text="login"/>
              <div className="text-center ">
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