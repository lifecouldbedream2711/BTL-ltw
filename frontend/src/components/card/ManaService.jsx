export default function ManageServiceCard({ service = {}, specialtyName = "-", onEdit, onDelete }) {
  const isActive = service?.active ?? service?.is_active ?? true;

  return (
    <div className="bg-white border w-[47%] border-gray-200 rounded-2xl shadow-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">{service?.name}</h2>
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
              {specialtyName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
            onClick={onEdit}
            aria-label="Edit"
          >
            <i className="fa-regular fa-pen-to-square" />
          </button>
          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-red-200 text-red-600 bg-white hover:bg-red-50 flex items-center justify-center"
            onClick={onDelete}
            aria-label="Delete"
          >
            <i className="fa-regular fa-trash-can" />
          </button>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-600 leading-relaxed">{service?.description ?? ""}</p>

      <div className="mt-5 flex items-center gap-6 flex-wrap text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-dollar-sign text-gray-400" />
          <span className="font-semibold text-gray-900">${Number(service?.price ?? 0).toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-2">
          <i className="fa-regular fa-clock text-gray-400" />
          <span>{service?.durationMin ?? service?.duration_min ?? "-"} min</span>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"}`}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}