export default function ManageSpecialtyCard({ specialty = {}, onEdit, onDelete }) {
  const isActive = specialty?.is_active ?? true;
  const name = specialty?.name || "-";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase())
      .join("") || "SP";

  return (
    <div className="bg-white w-[40%] border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isActive ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-700"}`}>
                {isActive ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-3xl">
              {specialty?.description ?? ""}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 shrink-0">
          <button onClick={onEdit} className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">
            <i className="fa-regular fa-pen-to-square mr-1" /> Edit
          </button>
          <button onClick={onDelete} className="px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 text-sm">
            <i className="fa-regular fa-trash-can mr-1" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}