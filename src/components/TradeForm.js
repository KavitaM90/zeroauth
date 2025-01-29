import React, { useEffect, useState } from "react";
import useTradeFormData from "../custom/useTradeFormData";

const TradeForm = ({ onSubmit, editingData }) => {
  const { formData, handleChange, resetForm } = useTradeFormData(); // Use custom hook for form data handling

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.stockName.trim()) {
      alert("Stock Name is required!");
      return;
    }

    if (onSubmit) {
      onSubmit(formData);
      resetForm(); // Reset the form data after submission
    } else {
      console.error("onSubmit function is not defined.");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const minLTP = parseFloat(formData.minLTP) || 0; // Default to 0 if NaN
      const maxLTP = parseFloat(formData.maxLTP) || 0; // Default to 0 if NaN
      const quantity = parseFloat(formData.quantity) || 0; // Default to 0 if NaN
      const buyPrice = parseFloat(formData.avgPrice) || 0; // Default to 0 if NaN
      const prevDayClose = parseFloat(formData.prevClose) || 0; // Default to 0 if NaN
  
      console.log("Parsed Values:", { minLTP, maxLTP, quantity, buyPrice, prevDayClose });
  
      if (minLTP && maxLTP && quantity) {
        // Ensure current LTP is fetched or start at `minLTP`
        const currentLTP = parseFloat(formData.ltp) || minLTP;
  
        // Calculate the new LTP by incrementing/decrementing by 0.5, within the range
        let newLTP = currentLTP + 0.5; // Increment by 0.5
        if (newLTP > maxLTP) newLTP = minLTP; // Reset to minLTP if exceeds maxLTP
  
        console.log("Updated LTP (step of 0.5):", newLTP);
  
        // Calculate derived fields
        const totalCurrentAmount = newLTP * quantity;
        const profit = (newLTP - buyPrice) * quantity;
        const percentageChange = prevDayClose
          ? ((newLTP - prevDayClose) / prevDayClose) * 100
          : 0;
  
        console.log("Calculated Fields:", {
          totalCurrentAmount,
          profit,
          percentageChange,
        });
  
        // Update the formData state with new values
        handleChange({
          target: {
            name: "ltp",
            value: newLTP,
          },
        });
        handleChange({
          target: {
            name: "totalCurrentAmount",
            value: totalCurrentAmount,
          },
        });
        handleChange({
          target: {
            name: "profit",
            value: profit,
          },
        });
        handleChange({
          target: {
            name: "percentageChange",
            value: percentageChange,
          },
        });
  
        console.log("Updated Form Data:", {
          ltp: newLTP,
          totalCurrentAmount,
          profit,
          percentageChange,
        });
      }
    }, 1000); 
  
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [formData, handleChange]);
  
  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-5 text-gray-800 text-center">
        {editingData ? "Edit Trade" : "Add Trade"}
      </h2>
   {/* Dropdown Fields */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            name: "positionType",
            label: "Position",
            options: ["Open", "Close"],
          },
          { name: "tradeType", label: "Trade", options: ["CNC", "NRML"] },
          {
            name: "marketType",
            label: "Market Type",
            options: ["Equity", "Options"],
          },
          {
            name: "holdingStatus",
            label: "Holding",
            options: ["Intraday", "Delivery"],
          },
          { name: "actionType", label: "Action", options: ["Buy", "Sell"] },
          {
            name: "expiryType",
            label: "Expiry",
            options: ["Monthly", "Weekly"],
          },

        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              {field.label}
            </label>
            <select
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              <option value="">Select</option>
              {field.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Text and Number Fields */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {[
          { name: "stockName", label: "Stock Name", type: "text" },
          { name: "quantity", label: "Quantity", type: "number" },
          { name: "minLTP", label: "Min LTP", type: "number" },
          { name: "maxLTP", label: "Max LTP", type: "number" },
          { name: "strikePrice", label: "Strike Price", type: "number" },
          { name: "avgPrice", label: "Average Price", type: "number" },
          { name: "prevClose", label: "Previous Close", type: "number" },
        ].map((field) => (
          <div key={field.name} className="space-y-2">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-600"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              type={field.type}
              placeholder={field.label}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="block w-full px-3 py-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        ))}
      </div>

      {/* Date Fields */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="space-y-2">
          <label
            htmlFor="optionExpDate"
            className="block text-sm font-medium text-gray-600"
          >
            Expiry Date
          </label>
          <input
            id="optionExpDate"
            type="date"
            name="optionExpDate"
            value={formData.optionExpDate}
            onChange={handleChange}
            className="block w-full px-3 py-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="optionExpThirdThurs"
            className="block text-sm font-medium text-gray-600"
          >
            Third Expiry
          </label>
          <input
            id="optionExpThirdThurs"
            type="text"
            name="optionExpThirdThurs"
            value={formData.optionExpThirdThurs}
            onChange={handleChange}
            placeholder="Third Thursday"
            className="block w-full px-3 py-2 border rounded-md text-gray-700 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md text-sm shadow-md hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          {editingData ? "Update" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default TradeForm;
