import { useState } from "react";

const useTradeFormData = () => {
  const [formData, setFormData] = useState({
    stockName: "",
    quantity: 0,
    minLTP: 0,
    maxLTP: 0,
    strikePrice: 0,
    avgPrice: 0,
    prevClose: 0,
    optionExpDate: "",
    optionExpThirdThurs: "",
    positionType: "",
    tradeType: "",
    marketType: "",
    holdingStatus: "",
    actionType: "",
    expiryType: "",
    totalInvestment: 0,
    profitOrLoss: 0,
    ltp: 0, // Add LTP state
    totalCurrentAmount: 0, // Add totalCurrentAmount state
    profit: 0, // Add profit state
    percentageChange: 0, // Add percentageChange state
  });

  // Derived calculation logic
  const calculateDerivedValues = (updatedData) => {
    const { quantity, avgPrice, strikePrice, ltp, prevClose } = updatedData;
    let totalInvestment = 0;
    let profitOrLoss = 0;
    let profit = 0;
    let percentageChange = 0;
    let totalCurrentAmount = 0;

    if (quantity && avgPrice) {
      totalInvestment = quantity * avgPrice;
    }
    if (strikePrice && quantity) {
      profitOrLoss = (strikePrice - avgPrice) * quantity;
    }

    if (ltp && quantity) {
      totalCurrentAmount = ltp * quantity;
      profit = (ltp - avgPrice) * quantity;
      percentageChange = prevClose ? ((ltp - prevClose) / prevClose) * 100 : 0;
    }

    return {
      totalInvestment,
      profitOrLoss,
      profit,
      percentageChange,
      totalCurrentAmount,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

      // Perform calculations after updating the form data
      const {
        totalInvestment,
        profitOrLoss,
        profit,
        percentageChange,
        totalCurrentAmount,
      } = calculateDerivedValues(updatedData);

      return {
        ...updatedData,
        totalInvestment,
        profitOrLoss,
        profit,
        percentageChange,
        totalCurrentAmount,
      };
    });
  };

  const resetForm = () => {
    setFormData({
      stockName: "",
      quantity: 0,
      minLTP: 0,
      maxLTP: 0,
      strikePrice: 0,
      avgPrice: 0,
      prevClose: 0,
      optionExpDate: "",
      optionExpThirdThurs: "",
      positionType: "",
      tradeType: "",
      marketType: "",
      holdingStatus: "",
      actionType: "",
      expiryType: "",
      totalInvestment: 0,
      profitOrLoss: 0,
      ltp: 0,
      totalCurrentAmount: 0,
      profit: 0,
      percentageChange: 0,
    });
  };

  return { formData, handleChange, resetForm };
};

export default useTradeFormData;
