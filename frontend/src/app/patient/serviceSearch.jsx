import TextInput from "../../components/input/textInput";
import SubButton from "../../components/button/SubButton";
import { useEffect, useMemo, useState } from "react";
import SpecialtyCard from "../../components/card/specialty";
import DoctorCard from "../../components/card/doctor";
import ServiceCard from "../../components/card/service";
import { services } from "../data/Services";
import {
  getAllSpecialtySummary,
  searchSpecialtyByName,
} from "../../service/specialtyApi";
import { getAllDoctors, searchDoctorsByName } from "../../service/doctorApi";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const navigate = useNavigate();
  const [searchTab, setSearchTab] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [specialties, setSpecialties] = useState([]);
  const [loadingSpecialty, setLoadingSpecialty] = useState(false);
  const [specialtyError, setSpecialtyError] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [doctorError, setDoctorError] = useState("");

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

  useEffect(() => {
    (async () => {
      try {
        setLoadingSpecialty(true);
        setSpecialtyError("");
        await loadAllSpecialties();
      } catch (e) {
        console.error("[Search] loadAllSpecialties error:", e?.response?.status, e?.response?.data || e.message);
        setSpecialtyError("Không tải được danh sách chuyên khoa");
        setSpecialties([]);
      } finally {
        setLoadingSpecialty(false);
      }
    })();

    (async () => {
      try {
        setLoadingDoctor(true);
        setDoctorError("");
        await loadAllDoctors();
      } catch (e) {
        console.error("[Search] loadAllDoctors error:", e?.response?.status, e?.response?.data || e.message);
        setDoctorError("Không tải được danh sách bác sĩ");
        setDoctors([]);
      } finally {
        setLoadingDoctor(false);
      }
    })();
  }, []);

  const handleSearch = async () => {
    const text = keyword.trim();

    if (searchTab === 1) {
      try {
        setLoadingSpecialty(true);
        setSpecialtyError("");
        if (!text) await loadAllSpecialties();
        else {
          const data = await searchSpecialtyByName(text);
          setSpecialties(normalizeSpecialties(data));
        }
      } catch (e) {
        console.error("[Search] searchSpecialtyByName error:", e?.response?.status, e?.response?.data || e.message);
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
        else {
          const data = await searchDoctorsByName(text);
          setDoctors(Array.isArray(data) ? data : []);
        }
      } catch (e) {
        console.error("[Search] searchDoctorsByName error:", e?.response?.status, e?.response?.data || e.message);
        setDoctorError("Tìm kiếm bác sĩ thất bại");
        setDoctors([]);
      } finally {
        setLoadingDoctor(false);
      }
    }
  };

  const normalizedKeyword = keyword.trim().toLowerCase();

  const filteredServices = useMemo(() => {
    if (!normalizedKeyword) return services;
    return services.filter((s) =>
      `${s?.name ?? ""} ${s?.description ?? ""}`.toLowerCase().includes(normalizedKeyword)
    );
  }, [normalizedKeyword]);

  return (
    <>
      <div className="mb-10 w-full">
        <p className="text-4xl mb-2 font-medium">Search</p>
        <p className="opacity-55">Find doctors, specialties, and services</p>
      </div>

      <div className="flex gap-2">
        <TextInput
          placeholder="Search by name, specialty, or service"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="w-30">
          <SubButton text="Search" onClick={handleSearch} />
        </div>
      </div>

      <div className="flex bg-gray-300 my-4 rounded-2xl justify-between w-[90%] h-8 p-1">
        <button onClick={() => setSearchTab(1)} className={`rounded-2xl w-[33%] ${searchTab === 1 ? "bg-gray-50" : ""}`}>Specialties</button>
        <button onClick={() => setSearchTab(2)} className={`rounded-2xl w-[33%] ${searchTab === 2 ? "bg-gray-50" : ""}`}>Doctors</button>
        <button onClick={() => setSearchTab(3)} className={`rounded-2xl w-[33%] ${searchTab === 3 ? "bg-gray-50" : ""}`}>Services</button>
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
            specialties.map((specialty) => <SpecialtyCard key={specialty.id} specialty={specialty} />)
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
            doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
          )}
        </div>
      )}

      {searchTab === 3 && (
        <div className="flex flex-wrap gap-3">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      )}
    </>
  );
}