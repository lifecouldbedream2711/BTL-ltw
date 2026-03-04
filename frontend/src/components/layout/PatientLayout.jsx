import Background from "./Background";
import PatientHeader from "../../app/patient/patientCompoment/patientHeader";
import SideBar from "./sidebar";
import SideBarButton from "../button/SideBarButton";

export default function PatientLayout({
  children,
  className = "",
  activeTab,
  setActiveTab,
}) {
  return (
    <Background className="relative">
      <PatientHeader />
      <div className="flex">
        <SideBar className="w-64 shrink-0 items-start">
          <SideBarButton active={activeTab === "search"} onClick={() => setActiveTab("search")}>
            <i className="fa-solid fa-magnifying-glass" />
            <p>Search</p>
          </SideBarButton>

          <SideBarButton active={activeTab === "booking"} onClick={() => setActiveTab("booking")}>
            <i className="fa-regular fa-calendar" />
            <p>Book a Appointment</p>
          </SideBarButton>

          <SideBarButton
            active={activeTab === "myAppointment"}
            onClick={() => setActiveTab("myAppointment")}
          >
            <i className="fa-solid fa-clipboard" />
            <p>My Appointment</p>
          </SideBarButton>

          <SideBarButton active={activeTab === "history"} onClick={() => setActiveTab("history")}>
            <i className="fa-solid fa-clock" />
            <p>History</p>
          </SideBarButton>

          <SideBarButton active={activeTab === "profile"} onClick={() => setActiveTab("profile")}>
            <i className="fa-solid fa-circle-user" />
            <p>Profile</p>
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
  );
}