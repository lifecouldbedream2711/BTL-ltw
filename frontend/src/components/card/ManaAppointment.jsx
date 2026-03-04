export default function ManaAppointment(props) {
    
  const appointment = props.appointment ?? props;

  const status = appointment?.status ?? "PENDING";

  const badgeClass =
    status === "APPROVED"
      ? "bg-blue-100 text-blue-700"
      : status === "DONE"
      ? "bg-green-100 text-green-700"
      : status === "CHECKED_IN"
      ? "bg-purple-100 text-purple-700"
      : "bg-gray-100 text-gray-700"; // PENDING/others

  // lấy date ở góc phải: cố lấy từ dateText (string) hoặc fallback "-"
  const topRightDate = appointment?.topRightDate ?? appointment?.shift_date ?? "-";

  const showCheckInButton = status === "APPROVED";

  const handleCheckIn = () => {

    alert("Patient checked in");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl w-full shadow-sm p-6 mb-6">
      {/* header row */}
      <div className="flex items-start justify-between">
        <span className={"px-3 py-1 rounded-full text-xs font-semibold " + badgeClass}>
          {status}
        </span>

        <span className="text-sm text-gray-500">{topRightDate}</span>
      </div>

      {/* content grid */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT: Patient */}
        <div>
          <p className="text-sm text-gray-500">Patient</p>

          <div className="mt-2 flex items-center gap-3">
            <i className="fa-regular fa-user text-gray-400" />
            <p className="text-lg font-semibold text-gray-900">
              {appointment?.patientName ?? "Patient Name"}
            </p>
          </div>

          <p className="mt-2 text-sm text-gray-700">
            {appointment?.patientPhone ?? appointment?.phone ?? "555-1234"}
          </p>

          <div className="mt-3 flex items-center gap-6 text-sm text-gray-700 flex-wrap">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar text-gray-500" />
              <span>{appointment?.dateText ?? "Date"}</span>
            </div>

            <div className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-gray-500" />
              <span>{appointment?.timeText ?? "Time"}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Doctor */}
        <div>
          <p className="text-sm text-gray-500">Doctor</p>

          <p className="mt-2 text-lg font-semibold text-gray-900">
            {appointment?.doctorName ?? "Doctor Name"}
          </p>

          <p className="mt-2 text-sm text-gray-700">
            {appointment?.serviceName ?? "Service"}
          </p>
        </div>
      </div>

      <hr className="my-6" />

      {/* Reason */}
      <div>
        <p className="text-sm text-gray-500">Reason:</p>
        <p className="mt-1 text-sm text-gray-900">{appointment?.reason ?? "-"}</p>
      </div>

      {/* Check In button (only approved) */}
      {showCheckInButton ? (
        <button
          type="button"
          onClick={handleCheckIn}
          className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-black"
        >
          <i className="fa-regular fa-circle-check" />
          Check In
        </button>
      ) : null}
    </div>
  );
}