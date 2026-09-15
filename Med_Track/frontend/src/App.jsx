import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import api from "./api/api";
import "./App.css";

import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AllMedicines from "./pages/AllMedicines";
import MyMedicines from "./pages/MyMedicines";
import DoseHistory from "./pages/DoseHistory";
import AddMedicine from "./pages/AddMedicine";

import SignIn from "./pages/SignIn";
//64f17db438fe7b6eb0100362e746b67e62e512e3
import DrugInfo from "./pages/DrugInfo";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    console.log("--> ProtectedRoute Mounted: Sending API Check Request...");

    api
      .get("/login/check")
      .then((res) => {
        console.log("--> Auth Response Success:", res.data);
        setIsAuthenticated(res.data?.authenticated === true);
      })
      .catch((err) => {
        console.log(
          "--> Auth Error Catch:",
          err.response?.status || err.message,
        );
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        Verifying authentication...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

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

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/all-medicines" element={<AllMedicines />} />
          <Route path="/my-medicines" element={<MyMedicines />} />
          <Route path="/dose-history" element={<DoseHistory />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/drug-info" element={<DrugInfo />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
