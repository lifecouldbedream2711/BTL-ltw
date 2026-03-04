import TextInput from "../../components/input/textInput";
import SubButton from "../../components/button/SubButton";

export default function Profile() {
    const user = {
    id: 1,
    user: {
      id: 1,
      full_name: "Nguyen Van A",
      email: "a@test.com",
      phone: "0901234567",
      role: "patient",
      is_active: true,
      created_at: "2026-03-04",
    },
    profile: {
      user_id: 1,
      dob: "2000-01-15",
      gender: "male",
      address: "HCMC",
      allergies: "None",
      medical_history: "No chronic disease",
    },
  };
    return (
        <div className="w-full h-screen p-4">
            <div>
                <p className="text-4xl mb-2 font-medium">My Profile</p>
                <p className="opacity-55"> View and manage your personal information</p>
            </div>
            <div className="flex  mt-4 shrink-0 space-x-20 flex-wrap">
                <div className="w-[35%] ">
                    <label htmlFor="profile-name">Name:</label>
                    <TextInput id="profile-name" value={user.user.full_name} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-email">Email:</label>
                    <TextInput id="profile-email" value={user.user.email} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-phone">Phone:</label>
                    <TextInput id="profile-phone" value={user.user.phone} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-dob">Date of Birth:</label>
                    <TextInput id="profile-dob" value={user.profile.dob} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-gender">Gender:</label>
                    <TextInput id="profile-gender" value={user.profile.gender} readOnly />  
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-address">Address:</label>
                    <TextInput id="profile-address" value={user.profile.address} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-allergies">License no:</label>   
                    <TextInput id="profile-allergies" value={user.profile.allergies} readOnly />
                </div>
                <div className="w-[35%]">
                    <label htmlFor="profile-medical-history">Bio:</label> <br />
                    <TextInput id="profile-medical-history" value={user.profile.medical_history} readOnly />
                </div>
            </div>
            <div className="mt-4 w-40">
                <SubButton text="Edit Profile" />
            </div>
        </div>
        )
    }