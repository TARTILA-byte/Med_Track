import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AllMedicines from "./pages/AllMedicines";
import MyMedicines from "./pages/MyMedicines";
import DoseHistory from "./pages/DoseHistory";
import AddMedicine from "./pages/AddMedicine";
<<<<<<< HEAD
import SignIn from "./pages/SignIn";
=======
import DrugInfo from "./pages/DrugInfo";
>>>>>>> 31c9831852cc565dd93db7e2bebb071926e3d610

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/all-medicines" element={<AllMedicines />} />
          <Route path="/my-medicines" element={<MyMedicines />} />
          <Route path="/dose-history" element={<DoseHistory />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/drug-info" element={<DrugInfo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
