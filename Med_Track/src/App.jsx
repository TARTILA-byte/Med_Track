import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
          <Route path="/" element={<Home />} />

          <Route path="/all-medicines" element={<AllMedicines />} />

          <Route path="/add-medicine" element={<AddMedicine />} />

          <Route path="/my-medicines" element={<MyMedicines />} />
        </Routes>
      </MedicineProvider>
    </BrowserRouter>
  );
}

export default App;
