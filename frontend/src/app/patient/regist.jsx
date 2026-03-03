import icon from "../../assets/icon.png";
import TextInput from "../../components/input/textInput";



export default function Regist() {
  return (
    <div className="bg-[#C7EBEE] h-screen w-screen flex items-center justify-center">
      <div className="bg-white h-[80%] w-[50%] rounded-2xl shadow-2xl ">
          <img src={icon} alt="" className="w-[10%] h-auto mx-auto my-3.25" />
          <p className="text-center text-2xl text-[#0EA4B5]">Create Account</p>
          <p className="text-center text-[16px] opacity-50 px-2.5">Regist for a new patient account</p>
          <div className="container flex flex-wrap ml-10 ">
            <div className="w-[45%]">
              <label htmlFor="full-name" className="">Full name</label>
              <TextInput id="full-name" placeholder="Phùng Thanh Độ"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="email">Email</label>
              <TextInput id="email" placeholder="DoMiC@gmail.com"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="phone">Phone</label>
              <TextInput id="phone" placeholder="0363636363"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Date of Birth</label>
              <TextInput id="full-name" placeholder="Phùng Thanh Độ"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="">Gender</label>
              <TextInput id="full-name" placeholder="Phùng Thanh Độ"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="address">Address</label>
              <TextInput id="address" placeholder="120 Yên lãng"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="password">Password</label>
              <TextInput id="password" placeholder="*******"></TextInput>
            </div>
            <div className="w-[45%]">
              <label htmlFor="confirm-password">Confirm password</label>
              <TextInput id="confirm-password" placeholder="*******"></TextInput>
            </div>
          </div>
      </div>
    </div>);
}