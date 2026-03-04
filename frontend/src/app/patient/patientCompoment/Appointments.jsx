

export default function AppointmentCard({ appointment, children }) {
    return (
        <div className=" bg-white rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-medium">{appointment.doctorName}</p>
                    <p className="text-sm opacity-75">{appointment.specialty}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === "APPROVED" ? " bg-sky-800 text-white" :  appointment.status === "DONE"?"text-green-800 bg-green-100":  "bg-yellow-100 text-yellow-800"
                }`}>
                    {appointment.status}
                </span>
            </div>
            <div className="mt-2">
                <p className="text-sm">{appointment.serviceName}</p>
                <p className="text-sm opacity-75">{appointment.dateText} at {appointment.timeText}</p>
            </div>
            <div className="mt-4">{children}</div>
            <hr />
            <div className=" mt-2">Reason: {appointment.reason}</div>
        </div>
    )
}