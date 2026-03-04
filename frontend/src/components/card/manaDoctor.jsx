export default function ManageDoctorCard(props) {

  const doctor = props.doctor ?? props;

  const isActive = doctor?.is_active ?? true;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">

        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
            {doctor?.initials ?? "DR"}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-900">
                {doctor?.name}
              </h2>

              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>

           
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border border-gray-200 bg-white">
                {doctor?.specialty}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <i className="fa-regular fa-envelope text-gray-500" />
                <span className="truncate">{doctor?.email ?? "-"}</span>
              </div>

              <div className="flex items-center gap-3">
                <i className="fa-solid fa-phone text-gray-500" />
                <span>{doctor?.phone ?? "-"}</span>
              </div>

              <div className="flex items-center gap-3 sm:col-span-2">
                <i className="fa-regular fa-id-badge text-gray-500" />
                <span>
                  <span className="text-gray-500">License:</span>{" "}
                  {doctor?.license ?? "-"}
                </span>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-3xl">
              {doctor?.bio ?? ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 shrink-0">
          <button className="w-32 h-10 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 font-semibold flex items-center justify-center gap-2">
            <i className="fa-regular fa-pen-to-square" />
            Edit
          </button>

          <button className="w-32 h-10 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center justify-center gap-2">
            <i className="fa-solid fa-lock" />
            {isActive ? "Deactivate" : "Activate"}
          </button>
        </div>
      </div>
    </div>
  );
}