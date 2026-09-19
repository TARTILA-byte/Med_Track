import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import "./App.css";

import ProtectedRoute from "./pages/ProtectedRoute";
import Login from "./pages/Login";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AllMedicines from "./pages/AllMedicines";
import MyMedicines from "./pages/MyMedicines";
import DoseHistory from "./pages/DoseHistory";
import AddMedicine from "./pages/AddMedicine";

import DrugInfo from "./pages/DrugInfo";
import Profile from "./pages/Profile";


// --- Admin Pages ---
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AddDrugReference from "./pages/admin/AddDrugReference";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminSignUp from "./pages/admin/AdminSignUp";



function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Protected Routes wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/all-medicines" element={<AllMedicines />} />
            <Route path="/my-medicines" element={<MyMedicines />} />
            <Route path="/dose-history" element={<DoseHistory />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/drug-info" element={<DrugInfo />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>


        {/* --- Standalone Admin Pages (No complex token checking) --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignUp />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/profile" replace />} />
          <Route path="add-drug-reference" element={<AddDrugReference />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>



        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />









      </Routes>
    </BrowserRouter>
  );
}

export default App;