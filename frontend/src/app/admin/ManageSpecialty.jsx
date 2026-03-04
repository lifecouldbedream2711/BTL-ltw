import {specialties} from "../data/Specialties"
import SubButton from "../../components/button/subButton"
import ManageSpecialtyCard from "../../components/card/ManaSpecialty"

export default function ManageSpecialty() {
    return (
        <div>
            <div className="float-right w-50 p-4">
                <SubButton onClick={() => alert("Add specialty")} > <i className="fa-solid fa-plus pr-1"></i> Add Specialty</SubButton>
            </div>
            <h1 className="text-2xl font-bold mb-4">Manage Specialties</h1>
            <p className="text-gray-600">Create and manage specialties in the system.</p>
            <div className="mt-6 flex flex-wrap gap-6">
                {specialties.map(specialty => (
                    <ManageSpecialtyCard key={specialty.id} specialty={specialty} />
                ))}
            </div>
        </div>
    )
}