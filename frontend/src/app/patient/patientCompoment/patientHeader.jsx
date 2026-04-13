import { useEffect, useState } from "react";
import Logout from "../../../components/button/Logout";
import icon from "../../../assets/icon.png";
import api from "../../../service/apiconfig";

export default function PatientHeader() {
  const [displayName, setDisplayName] = useState("User");

  useEffect(() => {
    const loadName = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("[Header] token:", token);

        if (!token) return;

        const payload = JSON.parse(atob(token.split(".")[1]));
        console.log("[Header] payload:", payload);

        const userId = payload?.userId;
        const role = payload?.scope || payload?.role;

        console.log("[Header] userId:", userId);
        console.log("[Header] role:", role);

        if (!userId) return;

        const endpoint =
          role === "DOCTOR" ? `/doctor/${userId}` : `/patient/patient/${userId}`;

        console.log("[Header] endpoint:", endpoint);

        const res = await api.get(endpoint);
        console.log("[Header] api response:", res?.data);

        const data = res?.data?.result || res?.data;

        const fullName =
          data?.full_name ||
          data?.fullName ||
          data?.name ||
          payload?.user_name ||
          payload?.sub ||
          "User";

        console.log("[Header] fullName:", fullName);

        setDisplayName(fullName);

        const oldUser = JSON.parse(localStorage.getItem("user") || "{}");
        localStorage.setItem(
          "user",
          JSON.stringify({ ...oldUser, id: userId, role, full_name: fullName })
        );
      } catch (e) {
        console.error("[Header] Load user name failed:", e);
      }
    };

    loadName();
  }, []);

  return (
    <div className="bg-white flex justify-between pl-10 py-3 sticky top-0 z-10">
      <div className="w-[20%]">
        <img src={icon} className="h-12 float-left pr-2" alt="" />
        <div>
          <p className="font-medium">Clinic Booking</p>
          <p className="opacity-50">Patient portal</p>
        </div>
      </div>

      <div className="w-[20%] py-3 flex gap-4 items-center">
        <span>
          Welcome, <span className="font-medium">{displayName}</span>
        </span>
        <Logout />
      </div>
    </div>
  );
}