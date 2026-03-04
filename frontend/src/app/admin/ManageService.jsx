import {services} from "../data/Services"
import SubButton from "../../components/button/subButton"
import ManageServiceCard from "../../components/card/ManaService"
export default function ManageServices() {
    return (
        <div>
            <div className="float-right w-50 p-4">
                <SubButton onClick={() => alert("Add service")} > <i className="fa-solid fa-plus pr-1"></i> Add Service</SubButton>
            </div>
            <h1 className="text-2xl font-bold mb-4">Manage Services</h1>
            <p className="text-gray-600">Create and manage services in the system.</p>
            <div className="mt-6 flex flex-wrap gap-6">
                {services.map(service => (
                    <ManageServiceCard key={service.id} service={service} />
                ))}
            </div>
        </div>
    )
}