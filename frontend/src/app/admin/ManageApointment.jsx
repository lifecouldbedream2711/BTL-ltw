
import SubButton from "../../components/button/subButton"

import { allAppointments } from "../data/allAppointments"
import TextInput from "../../components/input/textInput"
import ManaAppointment from "../../components/card/ManaAppointment"
export default function ManageAppointments() {
    return (
        <div>
            
            <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>
            <p className="text-gray-600">Create and manage appointments in the system.</p>
            <div className="flex mt-5">
                <TextInput placeholder="Search by patient, doctor, or specialty" />
                <div className="w-[20%]">
                    <SubButton className="w-[20%]" text="Search" onClick={() => alert("Search Appointments")} />
                </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-6">
                {allAppointments.map(appointment => (
                    <ManaAppointment key={appointment.id} appointment={appointment} />
                ))}
            </div>
        </div>
    )
}