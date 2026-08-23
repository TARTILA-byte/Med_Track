import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
// import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import AllMedicines from "./pages/AllMedicines";
import MyMedicines from "./pages/MyMedicines";
import AddMedicine from "./pages/AddMedicine";

function MainLayout() {
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
        <Route path="/" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/all-medicines" element={<AllMedicines />} />
          <Route path="/my-medicines" element={<MyMedicines />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
