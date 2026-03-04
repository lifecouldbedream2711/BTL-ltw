
export default function BookPopup({ title, message, onBack }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-full max-w-xl p-8 rounded-2xl bg-white shadow-lg border">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="mt-2 opacity-70">{message}</p>

        {onBack ? (
          <button
            className="mt-6 px-4 py-2 rounded-md bg-[#0EA4B5] text-white"
            onClick={onBack}
          >
            Quay lại
          </button>
        ) : null}
      </div>
    </div>
  );
}