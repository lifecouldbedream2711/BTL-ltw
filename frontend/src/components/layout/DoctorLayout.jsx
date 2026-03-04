import Background from "./Background";
import PatientHeader from "../../app/doctors/Compoment/DoctorHeader";
import SideBar from "./sidebar";
import SideBarButton from "../button/SideBarButton";


export default function DoctorLayout({
  children,
  className = "",
  activeTab,
  setActiveTab,
}) {
    return (
        <Background>
            <PatientHeader />
            <div className="flex">
            <SideBar>
                <SideBarButton
                    active={activeTab === "schedule"}
                    onClick={() => setActiveTab("schedule")}
                >
                    <i className="fa-solid fa-calendar-day" />
                    <p>my schedule</p>
                </SideBarButton>

                <SideBarButton
                    active={activeTab === "infor"}
                    onClick={() => setActiveTab("infor")}
                >
                    <i className="fa-solid fa-user" />
                    <p>My infor</p>
                </SideBarButton>
                </SideBar>
    
            <div
                className={
                "bg-gray-100 ml-10 mt-10 p-3 rounded-2xl h-full shadow-md w-[75%] " +
                className
                }
            >
                {children}
            </div>
        </div>                    
        </Background>
    )
}