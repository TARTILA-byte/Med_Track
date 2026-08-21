import { createContext, useState } from "react";

export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
  const [myMedicines, setMyMedicines] = useState([]);

  const addMedicine = (medicine) => {
    setMyMedicines((prev) => [...prev, medicine]);
  };

  const deleteMedicine = (id) => {
    setMyMedicines((prev) => prev.filter((medicine) => medicine.id !== id));
  };

  const updateMedicine = (updatedMedicine) => {
    setMyMedicines((prev) =>
      prev.map((medicine) =>
        medicine.id === updatedMedicine.id ? updatedMedicine : medicine,
      ),
    );
  };

  return (
    <MedicineContext.Provider
      value={{
        myMedicines,
        addMedicine,
        deleteMedicine,
        updateMedicine,
      }}
    >
      {children}
    </MedicineContext.Provider>
  );
};
