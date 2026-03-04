export default function ManageSpecialtyCard(props) {

  const specialty = props.specialty ?? props;

  const isActive = specialty?.is_active ?? true;

  return (
    <div className="bg-white w-[40%] border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-semibold text-lg">
            {specialty?.initials ?? "SP"}
          </div>
            <div className="min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {specialty?.name}
                    </h2>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-white">
                        {isActive ? "Active" : "Inactive"}
                    </span>
                </div>
                <p className="mt-4 text-sm text-gray-600 leading-relaxed max-w-3xl">
                    {specialty?.description ?? ""}
                </p>
            </div>
        </div>
        <div className="flex flex-col gap-3 shrink-0">
          {/* Action buttons like Edit/Delete can be added here */}
        </div>
      </div>
    </div>
  );
}