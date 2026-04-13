export default function ServiceCard({ service, className = "" ,onClick = null}) {
  const name = service?.name || service?.title || "Unnamed service";
  const specialty = service?.specialty || "General";
  const description = service?.description || "No description";
  const price = Number(service?.price ?? 0);
  const durationMin = Number(service?.durationMin ?? 0);
  const icon = service?.icon || "stethoscope";

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 w-[47%] m-[1%] ${className}`} onClick={onClick}>
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
          <i className={`fas fa-${icon} text-gray-500`} />
        </div>
        <div>
          <h3 className="text-lg font-medium">{name}</h3>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-2">{description}</p>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{price.toLocaleString("vi-VN")}đ</span>
        <span>{durationMin} min</span>
      </div>
    </div>
  );
}