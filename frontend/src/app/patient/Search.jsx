import TextInput from "../../components/input/textInput";
import SubButton from "../../components/button/SubButton";
import { useEffect, useState } from "react";
import SpecialtyCard from "../../components/card/specialty";
import DoctorCard from "../../components/card/doctor";
import ServiceCard from "../../components/card/service";
import {
  getAllSpecialtySummary,
  searchSpecialtyByName,
} from "../../service/specialtyApi";
import { getAllDoctors, searchDoctorsByName } from "../../service/doctorApi";
import { getAllServices, searchServicesByKey } from "../../service/serviceApi";

export default function Search({ onBookFromSearch }) {
  const [searchTab, setSearchTab] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [specialties, setSpecialties] = useState([]);
  const [loadingSpecialty, setLoadingSpecialty] = useState(false);
  const [specialtyError, setSpecialtyError] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [doctorError, setDoctorError] = useState("");

  const [services, setServices] = useState([]);
  const [loadingService, setLoadingService] = useState(false);
  const [serviceError, setServiceError] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minDuration, setMinDuration] = useState("");
  const [maxDuration, setMaxDuration] = useState("");
  const [activeOnly, setActiveOnly] = useState(true);

  const normalizeSpecialties = (list = []) =>
    (Array.isArray(list) ? list : []).map((s) => ({
      ...s,
      doctorsCount: Number(s?.doctorsCount ?? 0),
      servicesCount: Number(s?.servicesCount ?? 0),
    }));

  const loadAllSpecialties = async () => {
    const data = await getAllSpecialtySummary();
    setSpecialties(normalizeSpecialties(data));
  };

  const loadAllDoctors = async () => {
    const data = await getAllDoctors();
    setDoctors(Array.isArray(data) ? data : []);
  };

  const loadAllServices = async () => {
    const data = await getAllServices();
    setServices(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadAllSpecialties();
    loadAllDoctors();
    loadAllServices();
  }, []);

  const handleSearch = async () => {
    const text = keyword.trim();

    if (searchTab === 1) {
      try {
        setLoadingSpecialty(true);
        setSpecialtyError("");
        if (!text) await loadAllSpecialties();
        else setSpecialties(normalizeSpecialties(await searchSpecialtyByName(text)));
      } catch {
        setSpecialtyError("Tìm kiếm chuyên khoa thất bại");
        setSpecialties([]);
      } finally {
        setLoadingSpecialty(false);
      }
      return;
    }

    if (searchTab === 2) {
      try {
        setLoadingDoctor(true);
        setDoctorError("");
        if (!text) await loadAllDoctors();
        else setDoctors(await searchDoctorsByName(text));
      } catch {
        setDoctorError("Tìm kiếm bác sĩ thất bại");
        setDoctors([]);
      } finally {
        setLoadingDoctor(false);
      }
      return;
    }

    if (searchTab === 3) {
      try {
        setLoadingService(true);
        setServiceError("");

        const data = await searchServicesByKey({
          specialtyId: null,
          keyword: text || null,
          minPrice: minPrice === "" ? null : Number(minPrice),
          maxPrice: maxPrice === "" ? null : Number(maxPrice),
          minDuration: minDuration === "" ? null : Number(minDuration),
          maxDuration: maxDuration === "" ? null : Number(maxDuration),
          active: activeOnly,
        });

        setServices(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(
          "[Search] searchServicesByKey error:",
          e?.response?.status,
          e?.response?.data || e?.message
        );
        setServiceError("Tìm kiếm dịch vụ thất bại");
        setServices([]);
      } finally {
        setLoadingService(false);
      }
      return;
    }
  };

  return (
    <>
      <div className="mb-10 w-full">
        <p className="text-4xl mb-2 font-medium">Search</p>
        <p className="opacity-55">Find doctors, specialties, and services</p>
      </div>

      <div className="flex gap-2">
        <TextInput
          placeholder={
            searchTab === 3
              ? "Search service..."
              : "Search by name, specialty, or service"
          }
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="w-30">
          <SubButton text="Search" onClick={handleSearch} />
        </div>
      </div>

      {searchTab === 3 && (
        <div className="mb-3 ml-[10%]">
          <div className="w-[90%] flex items-center gap-2 flex-wrap">
            <label>Giá từ</label>
            <TextInput
              className="w-24 h-8 p-0 text-center mb-0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <label>đến</label>
            <TextInput
              className="w-24 h-8 p-0 text-center mb-0 mr-6"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            <label>Thời gian từ</label>
            <TextInput
              className="w-24 h-8 p-0 text-center mb-0"
              value={minDuration}
              onChange={(e) => setMinDuration(e.target.value)}
            />
            <label>đến</label>
            <TextInput
              className="w-24 h-8 p-0 text-center mb-0"
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
            />
            <span className="text-sm opacity-60">(phút)</span>

            <label className="ml-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={activeOnly}
                onChange={(e) => setActiveOnly(e.target.checked)}
              />
              Chỉ active
            </label>
          </div>
        </div>
      )}

      <div className="flex bg-gray-300 my-4 rounded-2xl justify-between w-[90%] h-8 p-1">
        <button
          onClick={() => setSearchTab(1)}
          className={`rounded-2xl w-[33%] ${searchTab === 1 ? "bg-gray-50" : ""}`}
        >
          Specialties
        </button>
        <button
          onClick={() => setSearchTab(2)}
          className={`rounded-2xl w-[33%] ${searchTab === 2 ? "bg-gray-50" : ""}`}
        >
          Doctors
        </button>
        <button
          onClick={() => setSearchTab(3)}
          className={`rounded-2xl w-[33%] ${searchTab === 3 ? "bg-gray-50" : ""}`}
        >
          Services
        </button>
      </div>

      {searchTab === 1 && (
        <div className="flex flex-wrap gap-3">
          {loadingSpecialty ? (
            <p>Loading specialties...</p>
          ) : specialtyError ? (
            <p className="text-red-500">{specialtyError}</p>
          ) : specialties.length === 0 ? (
            <p>No specialties found.</p>
          ) : (
            specialties.map((s) => (
              <SpecialtyCard
                key={s.id}
                specialty={s}
                onClick={() => onBookFromSearch?.({ specialty: s })}
              />
            ))
          )}
        </div>
      )}

      {searchTab === 2 && (
        <div className="flex flex-wrap gap-3">
          {loadingDoctor ? (
            <p>Loading doctors...</p>
          ) : doctorError ? (
            <p className="text-red-500">{doctorError}</p>
          ) : doctors.length === 0 ? (
            <p>No doctors found.</p>
          ) : (
            doctors.map((d) => (
              <DoctorCard
                key={d.id}
                doctor={d}
                onClick={() => onBookFromSearch?.({ doctor: d })}
              />
            ))
          )}
        </div>
      )}

      {searchTab === 3 && (
        <div className="flex flex-wrap gap-3">
          {loadingService ? (
            <p>Loading services...</p>
          ) : serviceError ? (
            <p className="text-red-500">{serviceError}</p>
          ) : services.length === 0 ? (
            <p>No services found.</p>
          ) : (
            services.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                onClick={() => onBookFromSearch?.({ service: s })}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}