
export default function SpecialtyCard({ specialty, key,className="", onClick }) {
    return (
        <div key={key} className={`bg-white rounded-lg shadow-md p-4 w-[47%] m-[1%] ${className}`} onClick={onClick}>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <i className={`fas fa-${specialty.icon} text-gray-500`}></i>
                </div>
                <div>
                    <h3 className="text-lg font-medium">{specialty.name}</h3>
                    <p className="text-sm text-gray-600">{specialty.description}</p>
                </div>
            </div>  
            <div className="flex justify-between text-sm text-gray-600">
                <span>{specialty.doctorsCount} Doctors</span>
                <span>{specialty.servicesCount} Services</span>
            </div>
        </div>
    )
}    