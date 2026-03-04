import AppointmentCard from "./patientCompoment/Appointments"
import { appointmentsSeed } from "../data/Appointments"

export default function MyAppointment() {
    return (
        <div className="w-full h-screen p-4">
            <div>
                <p className="text-4xl mb-2 font-medium">My Appointments</p>
                <p className="opacity-55"> View and manage your upcoming appointments</p>
            </div>
            <div className="mt-4">
                {appointmentsSeed.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} >
                        <button onClick={() => alert("Cancel appointment clicked")} className="px-3 mt-0.5 py-1 bg-red-500 text-white rounded-md text-sm float-right">Cancel</button>
                    </AppointmentCard>
                ))}
            </div>
        </div>
    )
}