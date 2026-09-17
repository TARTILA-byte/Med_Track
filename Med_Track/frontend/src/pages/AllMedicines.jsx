import React, { useEffect, useState } from "react";
import "./AllMedicines.css";
import api from "../api/api";
import MedicineCard from "../components/MedicineCard";
import SearchBar from "../components/SearchBar";

function AllMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search text
  const [searchText, setSearchText] = useState("");

  // Current page
  const [currentPage, setCurrentPage] = useState(1);

  // Medicines per page
  const medicinesPerPage = 10;

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        setLoading(true);

        const response = await api.get("/medicines");

        setMedicines(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to load medicines. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  // Search medicines
  const filteredMedicines = medicines.filter((medicine) => {
    const search = searchText.toLowerCase();

    const medicineName = medicine.name ? medicine.name.toLowerCase() : "";

    const genericName = medicine.genericName
      ? medicine.genericName.toLowerCase()
      : "";

    const category = medicine.category ? medicine.category.toLowerCase() : "";

    return (
      medicineName.includes(search) ||
      genericName.includes(search) ||
      category.includes(search)
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredMedicines.length / medicinesPerPage);

  // Get medicines for current page
  const startIndex = (currentPage - 1) * medicinesPerPage;

  const currentMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + medicinesPerPage,
  );

  // When search changes, go back to page 1
  const handleSearch = (value) => {
    setSearchText(value);
    setCurrentPage(1);
  };

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Scroll to top of medicine section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1>All Medicines</h1>

        <p>Search for a medicine and add it to your personal medicine list.</p>
      </div>

      <div className="filter-area">
        <SearchBar
          searchText={searchText}
          onSearch={handleSearch}
          medicines={medicines}
        />
      </div>

      {loading && <p>Loading medicines...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          {currentMedicines.length > 0 ? (
            <div className="medicine-grid">
              {currentMedicines.map((medicine) => (
                <MedicineCard
                  key={medicine._id || medicine.id}
                  medicine={medicine}
                />
              ))}
            </div>
          ) : (
            <p className="no-medicines">No medicines found.</p>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={currentPage === pageNumber ? "active-page" : ""}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default AllMedicines;
