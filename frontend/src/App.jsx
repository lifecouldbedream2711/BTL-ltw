import { Routes, Route } from "react-router-dom";
import Login from "./app/auth/page/login"; 
import Regist from "./app/patient/regist";
import Search from "./app/patient/Search";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regist" element={<Regist/>} />
      <Route path="patient/regist" element={<Search/>} />
    </Routes>
    );
  }