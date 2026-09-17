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
import SignIn from "./pages/SignIn";
import DrugInfo from "./pages/DrugInfo";
import Profile from "./pages/Profile";



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
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
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

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;