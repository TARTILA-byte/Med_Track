import { useCarbonFootprint } from "react-carbon-footprint";

const CarbonFootprintDisplay = () => {
  const [gCO2, bytesTransferred] = useCarbonFootprint();

  return (
    <div style={{
        position: "fixed",bottom: 10,right: 10,
        background: "rgba(255, 255, 255, 0.85)",padding: "10px",
        borderRadius: "5px",zIndex: 1000,
      }}>
      <h3>Network Carbon Footprint</h3>

      <p>Bytes Transferred: {bytesTransferred} bytes</p>

      <p>CO₂ Emissions: {gCO2.toFixed(2)} grams CO2eq </p> 

      <p style={{fontSize: "0.8rem", color: "#666",}} >
        (Estimates based on network data transfer during this session)
      </p>
    </div>
  );
};

export default CarbonFootprintDisplay;