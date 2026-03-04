import DoctorLayout from "../../components/layout/DoctorLayout";
import { useState } from "react";
import Schedule from "./Schedule";
import Profile from "./Profile";
export default function Doctor() {
    const [activeTab, setActiveTab] = useState("search");
    return (
        <DoctorLayout activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === "schedule" && <Schedule />}
        {activeTab === "infor" && <Profile />}
        </DoctorLayout>
    )
}