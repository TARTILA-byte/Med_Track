import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import AllMedicines from "./pages/AllMedicines";
import MyMedicines from "./pages/MyMedicines";
import AddMedicine from "./pages/AddMedicine";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/all-medicines" element={<AllMedicines />} />

        <Route path="/my-medicines" element={<MyMedicines />} />

        <Route path="/add-medicine" element={<AddMedicine />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
