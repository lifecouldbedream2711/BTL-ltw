import AdminLayout from "../../components/layout/AdminLayout"
import { useState } from "react";
import ManageDoctor from "./ManageDoctor";
import ManageSpecialty from "./ManageSpecialty";
import ManageServices from "./ManageService";
import ManageShifts from "./ManageShift";
import ManageAppointments from "./ManageApointment";

export default function admin() {
    const [activeTab, setActiveTab] = useState("manageDoctors");
    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab} >
            {activeTab === "manageDoctors" && <ManageDoctor />}
            {activeTab === "specialties" && <ManageSpecialty />}
            {activeTab === "services" && <ManageServices />}
            {activeTab === "doctorShifts" && <ManageShifts />}
            {activeTab === "appointments" && <ManageAppointments />}
        </AdminLayout>
    )
}