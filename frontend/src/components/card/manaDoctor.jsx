export default function ManageDoctorCard({
  doctor = {},
  specialtyName = "-",
  onEdit,
  onToggleActive,
}) {
  const isActive = doctor?.is_active ?? doctor?.isActive ?? true;
  const fullName = doctor?.fullName || doctor?.full_name || doctor?.name || "Doctor";
  const email = doctor?.email || "-";
  const phone = doctor?.phone || "-";
  const license = doctor?.licenseNo || doctor?.license_no || doctor?.license || "-";
  const bio = doctor?.bio || "";

  const initials =
    fullName
      .split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "DR";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {initials}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-900">{fullName}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  isActive ? "bg-emerald-100 text-emerald-700" : "bg-gray-200 text-gray-700"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
                {specialtyName}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <i className="fa-regular fa-envelope text-gray-500" />
                <span className="truncate">{email}</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-gray-500" />
                <span>{phone}</span>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <i className="fa-regular fa-id-badge text-gray-500" />
                <span>
                  <span className="text-gray-500">License:</span> {license}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-3xl">{bio}</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <button
            onClick={onEdit}
            className="w-32 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
          >
            <i className="fa-regular fa-pen-to-square" />
            Edit
          </button>

          <button
            onClick={onToggleActive}
            className={`w-32 h-10 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${
              isActive ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            <i className={`fa-solid ${isActive ? "fa-lock" : "fa-lock-open"}`} />
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
}