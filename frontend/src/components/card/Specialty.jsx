export default function SpecialtyCard({ specialty, className = "", onClick }) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 w-[47%] m-[1%] ${className}`}
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          {/* fallback icon nếu API không có field icon */}
          <i className={`fas fa-${specialty?.icon || "stethoscope"} text-gray-500`}></i>
        </div>
        <div>
          <h3 className="text-lg font-medium">{specialty?.name || "Unknown Specialty"}</h3>
          <p className="text-sm text-gray-600">
            {specialty?.description || "No description"}
          </p>
        </div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{specialty?.doctorsCount ?? 0} Doctors</span>
        <span>{specialty?.servicesCount ?? 0} Services</span>
      </div>
    </div>
  );
}