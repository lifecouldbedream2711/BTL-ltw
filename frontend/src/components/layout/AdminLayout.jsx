import Background from "./Background";
import AdminHeader from "../../app/admin/compoments/AdminHeader";
import SideBar from "./sidebar";
import SideBarButton from "../button/SideBarButton";



export default function AdminLayout({
  children,
  className = "",
  activeTab,
  setActiveTab,
}) {
    return (
        <Background>
            <AdminHeader></AdminHeader>
            <div className="flex">
                    <SideBar>
                        <SideBarButton
                            active={activeTab === "manageDoctors"}
                            onClick={() => setActiveTab("manageDoctors")}
                        >
                            <i className="fa-solid fa-user-doctor" />
                            <p>Manage Doctors</p>
                        </SideBarButton>

                        <SideBarButton
                            active={activeTab === "specialties"}
                            onClick={() => setActiveTab("specialties")}
                        >
                            <i className="fa-solid fa-stethoscope" />
                            <p>Specialties</p>
                        </SideBarButton>

                        <SideBarButton
                            active={activeTab === "services"}
                            onClick={() => setActiveTab("services")}
                        >
                            <i className="fa-solid fa-boxes-stacked" />
                            <p>Services</p>
                        </SideBarButton>

                        <SideBarButton
                            active={activeTab === "doctorShifts"}
                            onClick={() => setActiveTab("doctorShifts")}
                        >
                            <i className="fa-regular fa-calendar" />
                            <p>Doctor Shifts</p>
                        </SideBarButton>

                        <SideBarButton
                            active={activeTab === "appointments"}
                            onClick={() => setActiveTab("appointments")}
                        >
                            <i className="fa-regular fa-clipboard" />
                            <p>Appointments</p>
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