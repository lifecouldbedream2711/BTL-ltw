import { Routes, Route } from "react-router-dom";
import Login from "./app/auth/page/login"; 
import Regist from "./app/patient/regist";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/regist" element={<Regist/>} />
    </Routes>
    );
  }