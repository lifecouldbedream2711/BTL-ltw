import Logout from "../../../components/button/Logout";
import icon from "../../../assets/icon.png";

export default function PatientHeader(){
    return (
        <div className="bg-white flex justify-between pl-10 py-3 sticky top-0 z-10">
            <div className="w-[20%]">
                <img src={icon}  className="h-12 float-left pr-2"alt="" />
                <div>
                <p className="font-medium">Clinic Booking</p>
                <p className="opacity-50">Patient portal</p>
                </div>
            </div>
            <div className="w-[20%] py-3  flex  gap-4">
                <span>Welcome,<span className="font-medium">John Doe</span></span>
                <Logout></Logout>
                
            </div>
        </div>
       
    )
}