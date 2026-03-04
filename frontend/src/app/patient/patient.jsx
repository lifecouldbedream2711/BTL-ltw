import PatientLayout from "../../components/layout/PatientLayout";
import Search from "./Search";
import { useState } from "react";
import Booking from "./Booking";
import MyAppointment from "./myAppointment";
import History from "./history";
import Profile from "./profile";

export default function Patient() {
  const [activeTab, setActiveTab] = useState("search");

  return (
    <PatientLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "search" && <Search />}
      {activeTab === "booking" && <Booking />}
      {activeTab === "myAppointment" && <MyAppointment />}
      {activeTab === "history" && <History />}
      {activeTab === "profile" && <Profile />}
    </PatientLayout>
  );
}