import ManageDoctorCard from "../../components/card/manaDoctor"
import { doctors } from "../data/Doctors"
import SubButton from "../../components/button/subButton"


export default function ManageDoctor() {
    return (
        <div>
            <div className="float-right w-50 p-4">
                <SubButton onClick={() => alert("Add doctor")} > <i className="fa-solid fa-user-plus pr-1"></i> Add Doctor</SubButton>
            </div>
            <h1 className="text-2xl font-bold mb-4">Manage Doctors</h1>
            <p className="text-gray-600">Create and manage doctors in the system.</p>
            <div className="mt-6">
                {doctors.map(doctor => (
                    <ManageDoctorCard key={doctor.id} doctor={doctor} />
                ))}
            </div>
        </div>
    )
}