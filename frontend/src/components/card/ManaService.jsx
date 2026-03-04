export default function ManageServiceCard(props) {
  const service = props.service ?? props;
  const isActive = service?.is_active ?? true;

  return (
    <div className="bg-white border w-[47%] border-gray-200 rounded-2xl shadow-sm p-6">
      {/* Top row: title + actions */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold text-gray-900 leading-snug">
            {service?.name}
          </h2>

          {/* Specialty pill */}
          <div className="mt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
              {service?.specialty ?? "Specialty"}
            </span>
          </div>
        </div>

        {/* Actions: toggle + edit */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Toggle (UI only) */}
          <button
            type="button"
            className={
              "w-12 h-7 rounded-full p-1 transition-colors " +
              (isActive ? "bg-gray-900" : "bg-gray-300")
            }
            aria-label="Toggle active"
          >
            <span
              className={
                "block w-5 h-5 rounded-full bg-white transition-transform " +
                (isActive ? "translate-x-5" : "translate-x-0")
              }
            />
          </button>

          <button
            type="button"
            className="w-10 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center"
            aria-label="Edit"
          >
            <i className="fa-regular fa-pen-to-square" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-600 leading-relaxed">
        {service?.description ?? ""}
      </p>

      {/* Bottom row: price / duration / status */}
      <div className="mt-5 flex items-center gap-6 flex-wrap text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-dollar-sign text-gray-400" />
          <span className="font-semibold text-gray-900">
            ${Number(service?.price ?? 0).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <i className="fa-regular fa-clock text-gray-400" />
          <span>{service?.duration_min ?? service?.durationMin ?? "-"} min</span>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
}