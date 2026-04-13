import { useEffect, useMemo, useState } from "react";
import TextInput from "../../components/input/textInput";
import SubButton from "../../components/button/SubButton";
import SpecialtyCard from "../../components/card/specialty";
import ServiceCard from "../../components/card/service";
import DoctorCard from "../../components/card/doctor";
import DateInput from "../../components/input/DateInput";
import BookPopup from "../../components/pop up/book";

import { getShiftsByDoctor } from "../../service/shiftApi";
import { getDoctorBySpecialty, searchDoctorsByName } from "../../service/doctorApi";
import { getAllSpecialtySummary, searchSpecialtyByName } from "../../service/specialtyApi";
import { searchServicesByKey } from "../../service/serviceApi";
import api from "../../service/apiconfig";

export default function Booking({ prefill }) {
  const [step, setStep] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [specialties, setSpecialties] = useState([]);
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState("");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [selectedShiftId, setSelectedShiftId] = useState("");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [reason, setReason] = useState("");
  const [allowedDates, setAllowedDates] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasPickedService = !!selectedServiceId;
  const hasPickedDoctor = !!selectedDoctorId;

  const normalizeSpecialties = (list = []) =>
    (Array.isArray(list) ? list : []).map((s) => ({
      ...s,
      doctorsCount: Number(s?.doctorsCount ?? 0),
      servicesCount: Number(s?.servicesCount ?? 0),
    }));

  const resetAll = () => {
    setStep(1);
    setKeyword("");
    setServices([]);
    setDoctors([]);
    setTimeSlot([]);

    setSelectedSpecialty(null);
    setSelectedService(null);
    setSelectedDoctor(null);

    setSelectedSpecialtyId("");
    setSelectedServiceId("");
    setSelectedDoctorId("");
    setSelectedShiftId("");

    setReason("");
    setSelectedDate("");
    setSelectedTime("");
    setSelectedEndTime("");

    setAllowedDates([]);
    setError("");
    loadSpecialties();
  };

  const loadSpecialties = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAllSpecialtySummary();
      setSpecialties(normalizeSpecialties(data));
    } catch {
      setError("Không tải được chuyên khoa");
      setSpecialties([]);
    } finally {
      setLoading(false);
    }
  };

  const loadServicesBySpecialty = async (specialtyId, kw = "") => {
    if (!specialtyId) return setServices([]);
    setLoading(true);
    setError("");
    try {
      const data = await searchServicesByKey({
        specialtyId,
        keyword: kw?.trim() || null,
        active: true,
      });
      setServices(Array.isArray(data) ? data : []);
    } catch {
      setError("Không tải được dịch vụ");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctorsBySpecialty = async (specialtyId) => {
    if (!specialtyId) return setDoctors([]);
    setLoading(true);
    setError("");
    try {
      const data = await getDoctorBySpecialty(specialtyId);
      setDoctors(Array.isArray(data) ? data : []);
    } catch {
      setError("Không tải được bác sĩ");
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const loadAllowedDatesByDoctor = async (doctorId) => {
    if (!doctorId) {
      setAllowedDates([]);
      return;
    }

    try {
      const shifts = await getShiftsByDoctor(doctorId);
      const dates = (Array.isArray(shifts) ? shifts : [])
        .filter((s) => s?.bookable === true)
        .map((s) => s?.shiftDate)
        .filter(Boolean);

      setAllowedDates([...new Set(dates)].sort());
    } catch {
      setAllowedDates([]);
    }
  };

  const parseTimeToMin = (t = "") => {
    const [h, m] = String(t).split(":").map(Number);
    return (h || 0) * 60 + (m || 0);
  };

  const minToHHmm = (totalMin = 0) => {
    const h = String(Math.floor(totalMin / 60)).padStart(2, "0");
    const m = String(totalMin % 60).padStart(2, "0");
    return `${h}:${m}`;
  };

  const isOverlap = (startA, endA, startB, endB) => startA < endB && endA > startB;

  const loadAvailableSlotsByService = async () => {
    if (!selectedDoctorId || !selectedDate || !selectedService) {
      setError("Thiếu bác sĩ, ngày hoặc dịch vụ");
      return;
    }

    const duration = Number(selectedService?.durationMin ?? selectedService?.duration_min ?? 15);
    if (!duration || duration <= 0) {
      setError("Dịch vụ chưa có durationMin hợp lệ");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const shiftRes = await api.post("/shift/Find-to-book", {
        doctorId: selectedDoctorId,
        shiftDate: selectedDate,
      });
      const shifts = Array.isArray(shiftRes?.data?.result) ? shiftRes.data.result : [];

      const apptRes = await api.get(`/appointment/doctor/${selectedDoctorId}`, {
        params: { shiftDate: selectedDate },
      });
      const appointments = Array.isArray(apptRes?.data?.result) ? apptRes.data.result : [];

      const bookedRanges = appointments
        .filter((a) => ["PENDING", "CONFIRMED", "CHECKED_IN"].includes(a?.status))
        .map((a) => ({
          start: parseTimeToMin(a?.startAt),
          end: parseTimeToMin(a?.endAt),
        }))
        .filter((x) => x.start < x.end);

      const built = [];
      for (const s of shifts) {
        const shiftId = s?.id;
        const shiftStart = parseTimeToMin(s?.startTime);
        const shiftEnd = parseTimeToMin(s?.endTime);
        if (!shiftId || shiftStart >= shiftEnd) continue;

        for (let cur = shiftStart; cur + duration <= shiftEnd; cur += duration) {
          const slotStart = cur;
          const slotEnd = cur + duration;
          const occupied = bookedRanges.some((b) =>
            isOverlap(slotStart, slotEnd, b.start, b.end)
          );

          if (!occupied) {
            built.push({
              shiftId,
              time: minToHHmm(slotStart),
              endTime: minToHHmm(slotEnd),
              slotEmpty: true,
            });
          }
        }
      }

      setTimeSlot(built);
      setSelectedShiftId("");
      setSelectedTime("");
      setSelectedEndTime("");
    } catch (e) {
      console.error("[Booking] loadAvailableSlotsByService:", e?.response?.data || e?.message);
      setError("Không tải được lịch trống theo dịch vụ");
      setTimeSlot([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async () => {
    if (!selectedServiceId || !selectedShiftId || !selectedTime || !selectedEndTime) {
      setError("Vui lòng chọn đủ thông tin");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "null");
    const patientId = user?.id;
    if (!patientId) return setError("Vui lòng đăng nhập lại");

    setLoading(true);
    setError("");
    try {
      await api.post("/appointment/create", {
        patientId,
        serviceId: selectedServiceId,
        shiftId: selectedShiftId,
        status: "PENDING",
        startAt: selectedTime,
        endAt: selectedEndTime,
        reason: reason?.trim() || "",
      });
      setStep(5);
    } catch {
      setError("Đặt lịch thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const text = keyword.trim();

    // step 1: search specialty
    if (step === 1) {
      setLoading(true);
      setError("");
      try {
        if (!text) {
          await loadSpecialties();
        } else {
          const found = await searchSpecialtyByName(text);
          setSpecialties(normalizeSpecialties(found));
        }
      } catch {
        setError("Tìm kiếm chuyên khoa thất bại");
        setSpecialties([]);
      } finally {
        setLoading(false);
      }
      return;
    }

    // step 2: search service theo specialty đã chọn
    if (step === 2 && selectedSpecialtyId && !hasPickedService) {
      await loadServicesBySpecialty(selectedSpecialtyId, text);
      return;
    }

    // step 3: search doctor theo tên + lọc trong specialty
    if (step === 3 && selectedSpecialtyId && !hasPickedDoctor) {
      setLoading(true);
      setError("");
      try {
        if (!text) {
          await loadDoctorsBySpecialty(selectedSpecialtyId);
        } else {
          const searched = await searchDoctorsByName(text);
          const filtered = (Array.isArray(searched) ? searched : []).filter((d) => {
            const spId = d?.specialtyId ?? d?.specialty_id ?? "";
            return spId === selectedSpecialtyId;
          });
          setDoctors(filtered);
        }
      } catch {
        setError("Tìm kiếm bác sĩ thất bại");
        setDoctors([]);
      } finally {
        setLoading(false);
      }
      return;
    }
  };

  const searchPlaceholder = useMemo(() => {
    if (step === 1) return "Search specialty...";
    if (step === 2) return "Search service...";
    if (step === 3) return "Search doctor...";
    return "Search";
  }, [step]);

  useEffect(() => {
    loadSpecialties();
  }, []);

  useEffect(() => {
    if (!prefill) return;

    const run = async () => {
      if (prefill?.specialty?.id) {
        const s = prefill.specialty;
        setSelectedSpecialty(s);
        setSelectedSpecialtyId(s.id);

        setSelectedService(null);
        setSelectedServiceId("");
        setSelectedDoctor(null);
        setSelectedDoctorId("");
        setSelectedShiftId("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedEndTime("");
        setAllowedDates([]);
        setTimeSlot([]);

        await loadServicesBySpecialty(s.id, "");
        setStep(2);
        return;
      }

      if (prefill?.service?.id) {
        const sv = prefill.service;
        const specialtyId = sv?.specialtyId ?? sv?.specialty_id ?? "";
        if (!specialtyId) return setError("Service chưa có specialtyId");

        setSelectedSpecialtyId(specialtyId);
        setSelectedService(sv);
        setSelectedServiceId(sv.id);

        setSelectedDoctor(null);
        setSelectedDoctorId("");
        setSelectedShiftId("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedEndTime("");
        setAllowedDates([]);
        setTimeSlot([]);

        await loadDoctorsBySpecialty(specialtyId);
        setStep(3);
        return;
      }

      if (prefill?.doctor?.id) {
        const d = prefill.doctor;
        const specialtyId = d?.specialtyId ?? d?.specialty_id ?? "";
        if (!specialtyId) return setError("Doctor chưa có specialtyId");

        setSelectedSpecialtyId(specialtyId);
        setSelectedDoctor(d);
        setSelectedDoctorId(d.id);

        setSelectedService(null);
        setSelectedServiceId("");
        setSelectedShiftId("");
        setSelectedDate("");
        setSelectedTime("");
        setSelectedEndTime("");
        setTimeSlot([]);

        await loadAllowedDatesByDoctor(d.id);
        await loadServicesBySpecialty(specialtyId, "");
        setStep(2);
      }
    };

    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefill]);

  return (
    <div className="w-full min-h-screen p-4">
      <div className="mb-4">
        <p className="text-4xl mb-2 font-medium">Booking</p>
        <p className="opacity-55">Schedule your appointment with ease</p>
      </div>

      <p className="mt-2 opacity-80 flex flex-wrap items-center gap-2">
        <span className={`px-2 py-1 rounded ${selectedSpecialtyId ? "bg-emerald-100 text-emerald-700 font-bold" : "text-gray-500"}`}>1. Specialty</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded ${selectedServiceId ? "bg-emerald-100 text-emerald-700 font-bold" : "text-gray-500"}`}>2. Service</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded ${selectedDoctorId ? "bg-emerald-100 text-emerald-700 font-bold" : "text-gray-500"}`}>3. Doctor</span>
        <span>→</span>
        <span className={`px-2 py-1 rounded ${selectedDate && selectedTime ? "bg-emerald-100 text-emerald-700 font-bold" : "text-gray-500"}`}>4. Date & Time</span>
      </p>

      {step !== 4 && (
        <div className="flex gap-2 mt-4">
          <TextInput
            placeholder={searchPlaceholder}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <div className="w-30">
            <SubButton text="Search" onClick={handleSearch} />
          </div>
          <div className="w-24">
            <SubButton text="Reset" onClick={resetAll} />
          </div>
        </div>
      )}

      {error && <p className="text-red-500 mt-3">{error}</p>}
      {loading && <p className="mt-3">Loading...</p>}

      {step === 1 && (
        <div className="flex flex-wrap mt-4">
          {specialties.map((s) => (
            <SpecialtyCard
              key={s.id}
              specialty={s}
              onClick={async () => {
                setSelectedSpecialty(s);
                setSelectedSpecialtyId(s.id);
                setSelectedService(null);
                setSelectedServiceId("");
                setSelectedDoctor(null);
                setSelectedDoctorId("");
                setSelectedDate("");
                setSelectedTime("");
                setSelectedEndTime("");
                setSelectedShiftId("");
                setReason("");
                setAllowedDates([]);
                setTimeSlot([]);
                setKeyword("");

                await loadServicesBySpecialty(s.id, "");
                setStep(2);
              }}
            />
          ))}
        </div>
      )}

      {step === 2 && !hasPickedService && (
        <div className="flex flex-wrap mt-4">
          {services.map((sv) => (
            <ServiceCard
              key={sv.id}
              service={sv}
              onClick={async () => {
                setSelectedService(sv);
                setSelectedServiceId(sv.id);

                setSelectedDate("");
                setSelectedTime("");
                setSelectedEndTime("");
                setSelectedShiftId("");
                setReason("");
                setTimeSlot([]);
                setKeyword("");

                if (hasPickedDoctor) {
                  setStep(4);
                } else {
                  await loadDoctorsBySpecialty(selectedSpecialtyId);
                  setStep(3);
                }
              }}
            />
          ))}
        </div>
      )}

      {step === 3 && !hasPickedDoctor && (
        <div className="flex flex-wrap mt-4">
          {doctors.map((d) => (
            <DoctorCard
              key={d.id}
              doctor={d}
              onClick={async () => {
                setSelectedDoctor(d);
                setSelectedDoctorId(d.id);
                setSelectedDate("");
                setSelectedTime("");
                setSelectedEndTime("");
                setSelectedShiftId("");
                setReason("");
                setTimeSlot([]);
                setAllowedDates([]);
                setKeyword("");

                await loadAllowedDatesByDoctor(d.id);
                if (hasPickedService) setStep(4);
                else setStep(2);
              }}
            />
          ))}
        </div>
      )}

      {step === 4 && (
        <div className="mt-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="reason" className="block text-sm font-medium mb-1">
                Reason for Visit
              </label>
              <textarea
                id="reason"
                rows={4}
                placeholder="Mô tả triệu chứng / lý do khám (không bắt buộc)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-[#0EA4B5] shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Select Date</label>
              <DateInput
                className="w-full"
                value={selectedDate}
                allowedDates={allowedDates}
                onChange={(e) => {
                  const date = e.target.value;
                  setSelectedDate(date);
                  setSelectedShiftId("");
                  setSelectedTime("");
                  setSelectedEndTime("");
                  setTimeSlot([]);
                }}
              />

              <div className="mt-2 w-44">
                <SubButton
                  text="Lấy lịch trống"
                  onClick={loadAvailableSlotsByService}
                  disabled={!selectedDoctorId || !selectedDate || !selectedServiceId || loading}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Available Time Slots</p>
            <div className="flex flex-wrap w-full">
              {timeSlot.length === 0 ? (
                <p className="text-sm opacity-60">Không còn slot trống cho ngày này.</p>
              ) : (
                timeSlot.map((t, index) => {
                  const isSelected = selectedShiftId === t.shiftId && selectedTime === t.time;
                  return (
                    <div key={index} className="m-1 w-[31%] min-w-[170px]">
                      <SubButton
                        onClick={() => {
                          setSelectedShiftId(t.shiftId);
                          setSelectedTime(t.time);
                          setSelectedEndTime(t.endTime);
                        }}
                        className={isSelected ? "ring-2 ring-emerald-300" : ""}
                      >
                        <div>{t.time} - {t.endTime}</div>
                        <div className="text-sm text-white">Available</div>
                      </SubButton>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-5 w-52">
            <SubButton
              text="Confirm Booking"
              onClick={handleBook}
              disabled={!selectedDate || !selectedShiftId || loading}
            />
          </div>
        </div>
      )}

      {step === 5 && (
        <BookPopup
          title="Appointment Booked"
          message="Your appointment has been successfully booked."
          onBack={resetAll}
        />
      )}
    </div>
  );
}