import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-logo">
          MED<span>TRACK</span>
        </div>

        <h1>
          Manage Your Medicines
          <br />
          <span>Smartly & Easily</span>
        </h1>

        <p>
          Keep track of your medicines, dosage, frequency and medication
          schedule in one place.
        </p>

        <Link to="/all-medicines" className="home-button">
          Explore Medicines
        </Link>
      </div>
    </div>
  );
};

export default Home;
