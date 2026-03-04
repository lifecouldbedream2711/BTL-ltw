import AppointmentCard from "./patientCompoment/Appointments"
import {allAppointments} from "../data/allAppointments"

export default function History() {
    return (
        <div className="w-full h-screen p-4">
            <div>
                <p className="text-4xl mb-2 font-medium">Appointment History</p>
                <p className="opacity-55"> View and manage your past appointments</p>
            </div>
            <div className="mt-4">
                {allAppointments.map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} >
                    </AppointmentCard>
                ))}
            </div>
        </div>
    )
}