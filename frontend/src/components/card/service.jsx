export default function serviceCard({ service, key, className="" }) {
    return (
        <div key={key} className={`bg-white rounded-lg shadow-md p-4 w-[47%] m-[1%] ${className}`}>
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                    <i className={`fas fa-${service.icon} text-gray-500`}></i>
                </div>
                <div>
                    <h3 className="text-lg font-medium">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.specialty}</p>
                </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{service.description}</p>
            <div className="flex justify-between text-sm text-gray-600">
                <span>${service.price}</span>
                <span>{service.durationMin} min</span>
            </div>
        </div>
    )
}