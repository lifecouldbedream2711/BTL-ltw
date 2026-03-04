export default function DoctorCard({ doctor, key, onClick, className="" }) {
    return (
        <div key={key} className={`bg-white rounded-lg shadow-md p-4 w-[47%] m-[1%] ${className}`} onClick={onClick}>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <span className="text-gray-500 font-bold">{doctor.initials}</span>
                </div>
                <div>
                    <h3 className="text-lg font-medium">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                </div>
            </div>  
            <div className="flex justify-between text-sm text-gray-600">
                <span>{doctor.license}</span>
                <span>{doctor.phone}</span>
            </div>
        </div>
    )
}    