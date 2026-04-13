import PatientLayout from "../../components/layout/PatientLayout";
import Search from "./Search";
import { useState } from "react";
import Booking from "./Booking";
import MyAppointment from "./myAppointment";
import History from "./history";
import Profile from "./profile";

export default function Patient() {
  const [activeTab, setActiveTab] = useState("search");
  const [bookingPrefill, setBookingPrefill] = useState(null);

  const goToBookingFromSearch = (payload) => {
    // payload có thể là: { specialty } hoặc { service } hoặc { doctor }
    setBookingPrefill(payload || null);
    setActiveTab("booking");
  };

  return (
    <PatientLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === "search" && (
        <Search onBookFromSearch={goToBookingFromSearch} />
      )}
      {activeTab === "booking" && (
        <Booking prefill={bookingPrefill} />
      )}
      {activeTab === "myAppointment" && <MyAppointment />}
      {activeTab === "history" && <History />}
      {activeTab === "profile" && <Profile />}
    </PatientLayout>
  );
}