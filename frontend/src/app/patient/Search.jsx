import TextInput from "../../components/input/textInput"
import SubButton from "../../components/button/SubButton"
import { useState } from "react"
import SpecialtyCard from "../../components/card/specialty"
import DoctorCard from "../../components/card/doctor"
import ServiceCard from "../../components/card/service"
import { specialties } from "../data/Specialties"
import { doctors } from "../data/Doctors"
import { services } from "../data/Services"


export default function Search( {children}){
  const [searchTerm, setSearchTerm] = useState(1);

    return (
          <>
            <div className="mb-10 w-full">
            <p className="text-4xl mb-2 font-medium">Search</p>
            <p className="opacity-55"> Find doctors, specialties, and services</p>
            </div>
            <div className="flex">
                <TextInput placeholder="Search by name, specialty, or service" className=""></TextInput>
                <div className="w-30">
                    <SubButton text="Search"></SubButton>
                </div>
            </div>
            <div className="flex bg-gray-300 my-4 rounded-2xl  justify-between w-[90%] h-8 p-1 ">
                <button
                onClick={() => setSearchTerm(1)}

                className={`rounded-2xl w-[33%] hover:cursor-pointer ${searchTerm === 1 ? "bg-gray-50" : ""}`}>Specialties</button>
                <button
                onClick={() => setSearchTerm(2)}
                className={`rounded-2xl w-[33%] hover:cursor-pointer ${searchTerm === 2 ? "bg-gray-50" : ""}`} >Doctors</button>
                <button
                onClick={() => setSearchTerm(3)}
                className={`rounded-2xl w-[33%] hover:cursor-pointer ${searchTerm === 3 ? "bg-gray-50" : ""}`} >Services</button>            
            </div>
            {searchTerm === 1 ?
            <div className="flex flex-wrap">
            {specialties.map((specialty)=> <SpecialtyCard key={specialty.id} specialty={specialty} />)}
            </div> : searchTerm === 2 ? <div className="flex flex-wrap">
            {doctors.map((doctor)=> <DoctorCard key={doctor.id} doctor={doctor} />)}
            </div> : searchTerm === 3 ? <div className="flex flex-wrap">
            {services.map((service)=> <ServiceCard key={service.id} service={service} />)}
            </div> : null}
          </>
    )
}