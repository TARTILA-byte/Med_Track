import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllMedicines from "./pages/AllMedicines";
import AddMedicine from "./pages/AddMedicine";
import MyMedicines from "./pages/MyMedicines";
import { MedicineProvider } from "./context/MedicineContext";


function App() {
  return (
    <BrowserRouter>
      <MedicineProvider>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<home />} />

          <Route path="/all-medicines" element={<AllMedicines />} />

          <Route path="/add-medicine" element={<AddMedicine />} />

          <Route path="/my-medicines" element={<MyMedicines />} />
        </Routes>
      </MedicineProvider>
    </BrowserRouter>
  );
}

export default App
