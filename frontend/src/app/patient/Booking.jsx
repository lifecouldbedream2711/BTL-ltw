import TextInput from "../../components/input/textInput"
import SubButton from "../../components/button/SubButton"
import { useState } from "react"        
import SpecialtyCard from "../../components/card/specialty"
import {specialties} from "../data/Specialties"
import {doctors} from "../data/Doctors"
import {services} from "../data/Services"
import DoctorCard from "../../components/card/doctor"
import ServiceCard from "../../components/card/service"
import DateInput from "../../components/input/DateInput"
import BookPopup from "../../components/pop up/book"



export default function Booking( {children}){
    const [searchTerm, setSearchTerm] = useState(1);
    const timeSlot = [{"time": "08:00", slotEmpty: false}, {"time": "09:00", slotEmpty: true}, {"time": "10:00", slotEmpty: false}, {"time": "13:00", slotEmpty: true}, {"time": "14:00", slotEmpty: false}, {"time": "15:00", slotEmpty: true}];
    return (
        <div className="w-full h-screen p-4">
            <div>
                <p className="text-4xl mb-2 font-medium">Booking</p>
                <p className="opacity-55"> Schedule your appointment with ease</p>
            </div>
            <p className="mt-4 opacity-65">1. select specialty <span>→</span> 2. Service  <span>→</span> 3. Doctor <span>→</span> 4. Date & Time</p>
            <div className="flex mt-4">
                <TextInput placeholder="Search"></TextInput>
                <div className="w-[10%]">
                <SubButton className="ml-2" text="Search"></SubButton>
                </div>
            </div >
            <div className="flex mt-4 w-20">
                <SubButton text="Reset" onClick={()=> setSearchTerm(1)}></SubButton>
            </div>
            {searchTerm === 1 ?
            <div className="flex flex-wrap mt-4">
                {specialties.map((specialty)=> <SpecialtyCard key={specialty.id} specialty={specialty} onClick={()=> setSearchTerm(2)} />)}
            </div>  
             : searchTerm === 2 ? <div className="flex flex-wrap mt-4" onClick={()=> setSearchTerm(3)}>
            {services.map((service)=> <ServiceCard key={service.id} service={service} />)}
            </div> : searchTerm === 3 ? <div className="flex flex-wrap mt-4">
            {doctors.map((doctor)=> <DoctorCard key={doctor.id} doctor={doctor} onClick={()=> setSearchTerm(4)} />)}
            </div> : searchTerm === 4 ? <div>
                <div className="my-4">
                    <DateInput  />
                </div>
                <div className="flex flex-wrap mt-4 w-full">
                    {timeSlot.map((time, index)=> 
                    <div key={index} className="m-1 w-[30%]">
                        <SubButton  disabled={!time.slotEmpty} onClick={()=> setSearchTerm(5)} >
                            <div>{time.time}</div>
                            {time.slotEmpty ? <div className="text-sm text-white">Available</div> : <div className="text-md text-red-200">full</div>      }
                        </SubButton>
                    </div>)}
                </div>
            </div>
                : searchTerm === 5 ? <BookPopup title="Appointment Booked" message="Your appointment has been successfully booked." onBack={() => setSearchTerm(1)} /> 
                : null}
        </div>
    )
}    

