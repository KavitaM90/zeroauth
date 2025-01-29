import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context for market data
const MarketDataContext = createContext();
const calculateLTP = (minLTP, maxLTP) => {
    const min = parseFloat(minLTP);
    const max = parseFloat(maxLTP);
  
    if (min && max) {
      const steps = (max - min) / 0.05;
      const randomStep = Math.floor(Math.random() * steps);
      return (min + randomStep * 0.05).toFixed(2); // Round to 2 decimal places
    }
    return "N/A";
  };

// Custom provider component
export const MarketDataProvider = ({ children }) => {
  const [marketData, setMarketData] = useState({
    nifty50: "",
    niftyPrevClose: "",
    niftyMinLTP: "",
    niftyMaxLTP: "",
    sensex: "",
    sensexPrevClose: "",
    sensexMinLTP: "",
    sensexMaxLTP: "",
    username: "",
    profileName: "",
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prevData) => {
        // Calculate LTP for Nifty and Sensex
        const niftyLTP = calculateLTP(prevData["nifty-min-ltp"], prevData["nifty-max-ltp"]);
        const sensexLTP = calculateLTP(prevData["sensex-min-ltp"], prevData["sensex-max-ltp"]);
  
        console.log("Calculated Nifty LTP:", niftyLTP);
        console.log("Calculated Sensex LTP:", sensexLTP);
  
        // Calculate data for Nifty and Sensex
        const calculateData = (currentLTP, prevClose) => {
          const percentageChange = prevClose ? ((currentLTP - prevClose) / prevClose) * 100 : 0;
          const diff = prevClose ? (currentLTP - prevClose) : 0;
  
          console.log("Data Calculations:");
          console.log("  - diff:", diff);
          console.log("  - Percentage Change:", percentageChange);
  
          return {
            diff: parseFloat(diff.toFixed(2)),
            percentageChange: parseFloat(percentageChange.toFixed(2)),
          };
        };
  
        // Get calculated data for Nifty and Sensex
        const niftyData = calculateData(parseFloat(niftyLTP), parseFloat(prevData["nifty-prev-close"]));
        const sensexData = calculateData(parseFloat(sensexLTP), parseFloat(prevData["sensex-prev-close"]));
  
        // Update market data state
        return {
          ...prevData,
          niftyLTP: parseFloat(niftyLTP),
          sensexLTP: parseFloat(sensexLTP),
          niftyDiff: niftyData.diff,
          sensexDiff: sensexData.diff,
          niftyPercentageChange: niftyData.percentageChange,
          sensexPercentageChange: sensexData.percentageChange,
        };
      });
    }, 1000); // Update every second
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [marketData]);
  
  

  return (
    <MarketDataContext.Provider value={{ marketData, setMarketData }}>
      {children}
    </MarketDataContext.Provider>
  );
};

// Custom hook to use market data
export const useMarketData = () => {
  const context = useContext(MarketDataContext);
  if (!context) {
    throw new Error("useMarketData must be used within a MarketDataProvider");
  }
  return context;
};
