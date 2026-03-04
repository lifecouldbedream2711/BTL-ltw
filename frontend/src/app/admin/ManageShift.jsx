import {doctorShifts} from "../data/DoctorShift"
import SubButton from "../../components/button/subButton"
import ManageShiftCard from "../../components/card/ManaShift"



export default function ManageShifts() {
    return (
        <div>
            <div className="float-right w-50 p-4">
                <SubButton onClick={() => alert("Add shift")} > <i className="fa-solid fa-plus pr-1"></i> Add Shift</SubButton>
            </div>
            <h1 className="text-2xl font-bold mb-4">Manage Shifts</h1>
            <p className="text-gray-600">Create and manage shifts in the system.</p>
            <div className="mt-6 flex flex-wrap gap-6">
                {doctorShifts.map(shift => (
                    <ManageShiftCard key={shift.id} shift={shift} />
                ))}
            </div>
        </div>
    )
}