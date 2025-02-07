import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { CgShapeCircle } from "react-icons/cg";
import { MdOutlineFileDownload } from "react-icons/md";
import { CiSettings } from "react-icons/ci";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import ConfirmationModal from "../modal/ConfirmationModal";
// import useTradeFormData from "../custom/useTradeFormData";
// import TradeForm from "./TradeForm";
import tele1 from "../assets/tele1.jpg";
import { useMarketData } from "../custom/useMarketData";

const Position = () => {
  // const [isTradeFormVisible, setIsTradeFormVisible] = useState(false);
  const [data, setData] = useState([]); // Store submitted form data
  const [currentPage, setCurrentPage] = useState(1);
  const [submittedData, setSubmittedData] = useState([]);
  const rowsPerPage = 12;
  //const { formData, resetForm } = useTradeFormData(); // Using the custom hook to manage form data
  const [selectedRows, setSelectedRows] = useState([]);
  const { marketData, setMarketData } = useMarketData();
  const [showFormm, setShowFormm] = useState(false);

  const onFormSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(event.target); // Collect form data
    const data = Object.fromEntries(formData.entries()); // Convert to object
    console.log("Submitted Data:", data); // Debugging purposes

    // Perform validation if necessary
    if (!data.nifty50 || !data.username) {
      alert("Please fill all required fields.");
      return;
    }
    // Retrieve existing data from localStorage
    const storedData = JSON.parse(localStorage.getItem("marketData")) || [];
    console.log("Data Retrieved from Local Storage:", storedData);

    // Append new data
    // const updatedData = [...storedData, data];

    // // Save updated data to localStorage
    // localStorage.setItem("marketData", JSON.stringify(updatedData));
    // console.log("Data Saved in Local Storage:", JSON.parse(localStorage.getItem("marketData")));
    // Append new data
    const updatedData = [...storedData, data];

    // Update state with new data
    setData(updatedData); // Now, the 'data' state will hold the latest submitted data

    // Save updated data to localStorage
    console.log("Market Data:", marketData);
    localStorage.setItem("marketData", JSON.stringify(updatedData));
    console.log("Updated Data in State:", updatedData);

    setMarketData(data); // Update shared state
    setShowFormm(false); // Close the form modal
  };
  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("marketData")) || [];
  //   if (storedData.length > 0) {
  //     setMarketData(storedData);
  //   }
  // }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("marketData")) || [];
    if (storedData.length > 0) {
      setMarketData(storedData);
    }
  }, [setMarketData]); // ✅ Added 'setMarketData' in dependencies

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null); // Define selectedRowId
  // Handle row click (opens modal)
  const handleRowClick = (id) => {
    setSelectedRowId(id); // Store the selected row ID
    setIsModalOpen(true); // Open the modal
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRowId(null); // Reset selectedRowId when closing modal
  };

  // Confirm deletion of a row
  const confirmDeleteRow = () => {
    if (selectedRowId !== null) {
      const updatedData = submittedData.filter(
        (row) => row.id !== selectedRowId
      );
      setSubmittedData(updatedData);
    }
    closeModal(); // Close modal after deletion
  };

  // Handle Select All functionality
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(submittedData.map((row) => row.id));
    } else {
      setSelectedRows([]);
    }
  };

  const onToggle = () => {
    setShowFormm((prevState) => !prevState);
  };

  const handleRowSelect = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  // const isRowSelected = (index) => selectedRows.includes(index);

  // const handleDownloadClick = () => {
  //   setIsTradeFormVisible(true); // Show the TradeForm modal
  // };

  // const handleClose = () => {
  //   setIsTradeFormVisible(false); // Close the TradeForm modal
  // };
  // useEffect to log whenever data changes
  useEffect(() => {
    console.log("Data state updated:", data);
  }, [data]);

  // Sample data (you can replace this with actual data)
  const stockData = [
    // { stock: "RELIANCE", diff: "+10", percent: "+0.7%", value: "2,450.00" },
  ];
  // Pagination logic
  const totalPages = Math.ceil(stockData.length / rowsPerPage);
  const paginatedData = stockData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const [showForm, setShowForm] = useState(false);
  const [totalProfit, setTotalProfit] = useState(0);
  const [formData, setFormData] = useState({
    position: "OPEN",
    action: "BUY",
    orderType: "MIS",
    holdingStatus: "",
    marketType: "NSE",
    expiryType: "Monthly",
    stockName: "",
    buyPrice: "",
    minLTP: "",
    maxLTP: "",
    quantity: "",
    averagePrice: "",
    percentageChange: "",
    strikePrice: "",
    totalProfit: "",
    sellPrice: "",
  });

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePickerChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // const handleDeleteRow = (index) => {
  //   const updatedData = submittedData.filter((_, i) => i !== index);
  //   setSubmittedData(updatedData);
  // };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      ...formData,
      id: Date.now(), // Unique ID for each position
      ltp: parseFloat(formData.minLTP) || 0, // Ensure valid number
    };

    console.log("Submitted Data:", newData);

    // Update the submittedData state
    const updatedData = [...submittedData, newData];
    setSubmittedData(updatedData);

    // Save to localStorage
    localStorage.setItem("submittedData", JSON.stringify(updatedData));

    // Retrieve and log the stored data
    const storedData = JSON.parse(localStorage.getItem("submittedData"));
    console.log("Data in Local Storage:", storedData);

    // Reset the form data
    setFormData({
      position: "OPEN",
      action: "BUY",
      orderType: "MIS",
      marketType: "NSE",
      holdingStatus: "",
      expiryType: "Monthly",
      stockName: "",
      buyPrice: "",
      minLTP: "",
      maxLTP: "",
      quantity: "",
      averagePrice: "",
      percentageChange: "",
      strikePrice: "",
      totalProfit: "",
      sellPrice: "",
    });

    setShowForm(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSubmittedData((prevData) => {
        const updatedData = prevData.map((position) => {
          const {
            minLTP,
            maxLTP,
            quantity,
            prevClose,
            averagePrice,
            action,
            sellPrice,
          } = position;

          const min = parseFloat(minLTP);
          const max = parseFloat(maxLTP);
          const qty = parseInt(quantity, 10) || 0;
          const avgPrice = parseFloat(averagePrice) || 0;
          const sellPrc = parseFloat(sellPrice) || 0;

          if (!isNaN(min) && !isNaN(max) && max > min) {
            const steps = (max - min) / 0.05;
            const randomStep = Math.floor(Math.random() * steps);
            const newLTP = min + randomStep * 0.05;

            // Profit calculation functions
            const calculateProfit = ({ action, newLTP, avgPrice, qty }) => {
              if (action === "BUY") {
                return (newLTP - avgPrice) * qty;
              } else if (action === "SELL") {
                return (avgPrice - newLTP) * qty;
              }
              return 0;
            };

            const profit = calculateProfit({ action, newLTP, avgPrice, qty });

            const calculateCloseProfit = ({
              action,
              avgPrice,
              sellPrc,
              qty,
            }) => {
              if (action === "BUY") {
                return (sellPrc - avgPrice) * qty;
              } else if (action === "SELL") {
                return (avgPrice - sellPrc) * qty;
              }
              return 0;
            };

            const profitClose = calculateCloseProfit({
              action,
              avgPrice,
              sellPrc,
              qty,
            });
            console.log("Profit for CLOSE position:", profitClose);

            const totalCurrentAmount = newLTP * qty;
            const percentageChange = prevClose
              ? ((newLTP - prevClose) / prevClose) * 100
              : 0;

            return {
              ...position,
              ltp: parseFloat(newLTP.toFixed(2)),
              totalCurrentAmount: parseFloat(totalCurrentAmount.toFixed(2)),
              profit: parseFloat(profit.toFixed(2)),
              profitClose: parseFloat(profitClose.toFixed(2)),
              percentageChange: parseFloat(percentageChange.toFixed(2)),
            };
          }
          return position; // Return unchanged if invalid min/max
        });

        // Calculate total profit
        const totalProfit = updatedData.reduce(
          (acc, entry) => acc + (entry.profit || 0),
          0
        );
        setTotalProfit(totalProfit);
        console.log("Total Profit:", totalProfit);

        return updatedData;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []); // Removed `submittedData` dependency to prevent infinite loops

  const sortedData = useMemo(() => {
    return [...submittedData].sort((a, b) => {
      const order = { OPEN: 1, CLOSE: 2, OTHER: 3 };
      return (order[a.position] || 3) - (order[b.position] || 3);
    });
  }, [submittedData]);
  return (
    <div className="ml-[10px] mr-1 font-sans mt-10 overflow-y-hidden ">
      {/* Flex container for both tables */}
      <div className="flex flex-col lg:flex-row pl-1 lg:space-x-6 relative top-3">
        {/* Table 1: NIFTY/SENSEX Stock Data */}
        <div className="w-full lg:w-1/3 relative h-[90vh]">
          {/* Content Container */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 -top-3 -bottom-3 border-r border-gray-300 h-screen"></div>

            {/* First Row: Search Bar */}
            <div className="flex justify-between mb-3 pt-0 relative border-b border-r border-gray-300 -ml-4">
              <div className="relative w-full sm:w-full backdrop-brightness-200 mx-auto">
                <input
                  type="text"
                  placeholder="Search eg: infy bse, nifty fut, gold mcx"
                  className="p-2 pl-10 pr-20 w-full text-textGray border-none text-xs font-sans font-normal focus:outline-none"
                />
                <MdOutlineSearch className="absolute top-2 left-2 w-4 h-4 text-textGray ml-2" />
                <div className="absolute top-2 right-2 text-xs text-gray-400">
                  0/100
                </div>
              </div>
            </div>

            {/* Second Row: Stock Data Table */}
            <div className="overflow-y-auto custom-scrollbar max-h-[calc(90vh-80px)]">
              {paginatedData.length === 0 ? (
                <div className="flex justify-center items-center text-center text-gray-500 text-xl py-4 mt-5">
                  <div className="flex flex-col space-y-4 items-center">
                    <div className="bg-white">
                      <img
                        src={tele1}
                        alt="telescope"
                        className="w-16 h-12 mx-auto text-textGray bg-white"
                      />
                    </div>
                    <div>
                      <p className="font-[Open Sans] text-customGray text-xl font-normal leading-7">
                        Nothing here
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-sm font-normal leading-4 text-left underline-offset-4">
                        Use the search bar to add instruments
                      </p>
                    </div>
                    <div>
                      <button className="w-36 h-9 rounded bg-coustomBlue text-white text-base font-normal">
                        Add Instrument
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <table className="w-full table-auto">
                  <tbody>
                    {paginatedData.map((row, index) => (
                      <tr
                        key={index}
                        className="border-t shadow-sm shadow-gray-100"
                      >
                        <td className="p-2 text-customGray text-xs font-medium ml-1 truncate text-wrap">
                          {row.stock}
                          <span className="mr-1 text-center text-xxs text-labelGray">
                            index
                          </span>
                        </td>
                        <td className="p-1 text-customGray text-xs font-medium truncate text-wrap text-start w-8">
                          {row.diff}
                        </td>
                        <td className="p-1 text-xs font-medium text-end w-8 text-wrap truncate">
                          {parseFloat(row.percent) < 0 ? (
                            <span className="flex items-center space-x-1">
                              <span className="text-customGray">
                                {row.percent ? row.percent.toFixed(2) : "0.00"}
                              </span>
                              <SlArrowDown className="text-stockRed" />
                            </span>
                          ) : (
                            <span className="flex items-center space-x-1">
                              <span className="text-customGray">
                                {row.percent ? row.percent.toFixed(2) : "0.00"}
                              </span>
                              <SlArrowUp className="text-textGreen" />
                            </span>
                          )}
                        </td>
                        <td className="p-1 text-customGray text-xs font-medium border-r text-end w-12 mr-1">
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination and Settings Icon */}
            <div className="fixed bottom-0 left-0 bg-white w-1/3 mx-auto shadow-md z-10 border-t border-r-2 border-gray-300">
              <div className="flex justify-between items-center max-w-screen-xl mx-auto h-9">
                <div className="flex overflow-x-auto">
                  {[...Array(Math.max(totalPages, 7)).keys()].map((page) => (
                    <button
                      key={page + 1}
                      onClick={() => handlePageChange(page + 1)}
                      className={`py-1 text-xs ${
                        currentPage === page + 1
                          ? "bg-slate-50 text-red-400"
                          : "bg-white text-headingGray border"
                      } w-12 h-10`}
                    >
                      {page + 1}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2 pr-2">
                  <CiSettings className="w-6 h-6 text-customGray cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table 2: Holdings Data */}
        <div className="w-full lg:w-2/3 font-sans overflow-y-auto custom-scrollbar h-[90vh]">
          {/* First Row: Holdings Information */}
          <>
            <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 pt-4">
              {/* Left Section: Holdings and Select */}
              <div className="flex items-center flex-grow">
                <span className="font-sans font-normal text-customGray text-lg leading-6">
                  Positions
                </span>
                <span className="ml-1">({submittedData.length})</span>
              </div>

              {/* Right Section: Other elements */}
              <div className="flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 space-x-6 items-center pr-6">
                <div className="relative w-24">
                  <MdOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-customGray" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-borderWhite text-xs text-center w-full h-7 pl-6" // Reduced padding from pl-8 to pl-6
                  />
                </div>
                <span
                  className="flex items-center space-x-1 text-xs text-coustomBlue"
                  onClick={onToggle}
                >
                  <CgShapeCircle className="h-4 w-4" />
                  <span className="leading-none">Analytics</span>
                </span>
                {/* Market Data Form */}
                {showFormm && (
                  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
                    <div className="bg-white py-10 max-w-4xl w-full mx-4 p-8 shadow-md rounded-md relative">
                      <h2 className="text-2xl font-bold mb-6 text-gray-700">
                        Market Data Form
                      </h2>
                      <form className="space-y-4" onSubmit={onFormSubmit}>
                        {/* Row 1: Nifty50 and Prev Day Close */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="nifty50"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Nifty50
                            </label>
                            <input
                              type="text"
                              id="nifty50"
                              name="nifty50"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Nifty50"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="nifty-prev-close"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Prev Day Close
                            </label>
                            <input
                              type="number"
                              step="any"
                              id="nifty-prev-close"
                              name="nifty-prev-close"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Prev Day Close"
                            />
                          </div>
                        </div>

                        {/* Row 2: Min LTP and Max LTP */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="nifty-min-ltp"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Min LTP
                            </label>
                            <input
                              type="text"
                              step="any"
                              id="nifty-min-ltp"
                              name="nifty-min-ltp"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Min LTP"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="nifty-max-ltp"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Max LTP
                            </label>
                            <input
                              type="number"
                              step="any"
                              id="nifty-max-ltp"
                              name="nifty-max-ltp"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Max LTP"
                            />
                          </div>
                        </div>

                        {/* Row 3: Sensex and Prev Day Close */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="sensex"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Sensex
                            </label>
                            <input
                              type="text"
                              id="sensex"
                              name="sensex"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Sensex"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="sensex-prev-close"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Prev Day Close
                            </label>
                            <input
                              type="number"
                              step="any"
                              id="sensex-prev-close"
                              name="sensex-prev-close"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Prev Day Close"
                            />
                          </div>
                        </div>

                        {/* Row 4: Min LTP and Max LTP */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="sensex-min-ltp"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Min LTP
                            </label>
                            <input
                              type="number"
                              step="any"
                              id="sensex-min-ltp"
                              name="sensex-min-ltp"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Min LTP"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="sensex-max-ltp"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Max LTP
                            </label>
                            <input
                              type="number"
                              step="any"
                              id="sensex-max-ltp"
                              name="sensex-max-ltp"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Max LTP"
                            />
                          </div>
                        </div>

                        {/* Row 5: Username and Profile Name */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Username
                            </label>
                            <input
                              type="text"
                              id="username"
                              name="username"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Username"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="profile-name"
                              className="block text-sm font-medium text-gray-600"
                            >
                              Profile Name
                            </label>
                            <input
                              type="text"
                              id="profile-name"
                              name="profile-name"
                              className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                              placeholder="Enter Profile Name"
                            />
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-4">
                          <button
                            type="submit"
                            className="w-1/2 mr-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
                          >
                            Submit
                          </button>
                          <button
                            type="reset"
                            className="w-1/2 ml-2 py-2 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300"
                            onClick={onToggle}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                <></>
                <span
                  className="flex items-center space-x-1 text-xs text-coustomBlue cursor-pointer"
                  onClick={toggleForm}
                >
                  <MdOutlineFileDownload className="h-4 w-4" />
                  <span className="leading-none">Download</span>
                </span>
                {showForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="p-4 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-md bg-white">
                      <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">
                        Add New Position
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Pickers in two columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Position
                            </label>
                            <select
                              name="position"
                              value={formData.position}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="OPEN">OPEN</option>
                              <option value="CLOSE">CLOSE</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Order Type
                            </label>
                            <select
                              name="orderType"
                              value={formData.orderType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="MIS">MIS</option>
                              <option value="NRML">NRML</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Segment Type
                            </label>
                            <select
                              name="marketType"
                              value={formData.marketType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="NSE">NSE</option>
                              <option value="NFO">NFO</option>
                              <option value="BFO">BFO</option>
                              <option value="MCX">MCX</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Action
                            </label>
                            <select
                              name="action"
                              value={formData.action}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Expiry
                            </label>
                            <select
                              name="expiryType"
                              value={formData.expiryType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                            </select>
                          </div>
                        </div>
                        {/* Text Inputs in two columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Stock Name
                            </label>
                            <input
                              type="text"
                              name="stockName"
                              value={formData.stockName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Stock Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Date
                            </label>
                            <input
                              type="text"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Date"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              TH,RD,ND
                            </label>
                            <input
                              type="text"
                              name="thRdNd"
                              value={formData.thRdNd}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter TH RD ND"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Strike Price
                            </label>
                            <input
                              type="text"
                              step="0.01"
                              name="buyPrice"
                              value={formData.buyPrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Buy Price"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Quantity"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Average Price
                            </label>
                            <input
                              type="number"
                              name="averagePrice"
                              value={formData.averagePrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Average Price"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Prev Close
                            </label>
                            <input
                              type="number"
                              name="prevClose"
                              value={formData.prevClose}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Previous Close"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Min LTP
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              name="minLTP"
                              value={formData.minLTP}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Min LTP"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Max LTP
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              name="maxLTP"
                              value={formData.maxLTP}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Max LTP"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Sell Price
                            </label>
                            <input
                              type="number"
                              name="sellPrice"
                              value={formData.sellPrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Sell Price"
                            />
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-3">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={toggleForm}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Close Form
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Render TradeForm as a modal if isTradeFormVisible is true */}
            {/* {isTradeFormVisible && (
              <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
                  <TradeForm
                    formData={formData}
                    onFormSubmit={handleFormSubmit}
                    onClose={handleClose}
                  />{" "} */}
            {/* Your TradeForm component */}
            {/* <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            )} */}
          </>

          {/* Second Row: Stock Details Table */}
          <div>
            {submittedData.length > 0 ? (
              <table className=" table-fixed w-full">
                <thead>
                  <tr className="text-customGray text-xm font-sans font-normal leading-4 border-t">
                    {/* <th className="p-4 text-start font-sans text-headingGray font-normal h-11"></th> */}
                    <th className="p-4 text-start font-sans text-headingGray font-normal w-3 h-11">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedRows.length > 0 &&
                          selectedRows.length === data.length
                        }
                      />
                    </th>
                    <th className="p-4 text-start font-sans text-headingGray font-normal w-20 h-11">
                      Product
                    </th>
                    <th className="p-4 text-headingGray text-start font-sans font-normal w-40 h-11">
                      Instrument
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Qty.
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Avg.
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      LTP
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray bg-slate-50 w-24 h-11">
                      P&L
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Chg.
                    </th>
                    <th className="w-2 h-11"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row) => (
                    <tr
                      key={row.id} // Use unique id
                      onClick={() => handleRowClick(row.id)} // Pass id instead of index
                      // className={`border-t shadow-sm shadow-gray-100 ${
                      //   row.position === "CLOSE" ? "bg-rowDisable !text-disableText" : ""
                      // }`}
                      className={`border-t shadow-sm shadow-gray-100 ${
                        row.position === "CLOSE"
                          ? "bg-rowDisable !text-disableText"
                          : ""
                      } ${selectedRows.includes(row.id) ? "selected" : ""}`}
                    >
                      {/* Checkbox */}
                      <td className="p-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => handleRowSelect(row.id)}
                        />
                      </td>

                      {/* Order Type */}
                      <td className="p-4 text-cellGray text-xs font-normal text-center">
                        <span
                          className={`h-5 w-12 flex justify-center items-center -ml-1 ${
                            row.position === "CLOSE" &&
                            (row.expiryType === "Weekly" ||
                              row.expiryType === "Monthly")
                              ? "!bg-bgOff !text-disableText"
                              : row.orderType === "MIS"
                              ? "bg-productBg text-textProduct"
                              : row.orderType === "NRML"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          }`}
                        >
                          {row.orderType}
                        </span>
                      </td>

                      {/* Stock Details */}
                      <td
                        className={`p-4 text-start text-sm font-normal  flex items-center justify-start ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : "text-customGray"
                        }`}
                      >
                        <span className="mx-1 text-labelGray tracking-wider">
                          {row.marketType === "NSE" &&
                          row.expiryType === "Monthly" &&
                          row.position === "CLOSE" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.position === "OPEN" &&
                            (row.expiryType === "Monthly" || "Weekly") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : (row.marketType === "NFO" || "BFO" || "MCX") &&
                            row.position === "CLOSE" &&
                            row.expiryType === "Monthly" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-headingGray text-sm">
                                  {row.buyPrice}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.position === "OPEN" &&
                            (row.expiryType === "Monthly" || "Weekly") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.expiryType === "Weekly" &&
                            row.position === "CLOSE" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "OPEN" &&
                            row.expiryType === "Weekly" &&
                            (row.marketType === "NFO" || "MCX" || "BFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.date}
                                  <sup className="text-xms text-customGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "CLOSE" &&
                            row.expiryType === "Weekly" &&
                            (row.marketType === "NFO" || "MCX" || "BFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-headingGray">
                                  {row.date}
                                  <sup className="text-xms text-headingGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-headingGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "OPEN" &&
                            row.expiryType === "Monthly" &&
                            (row.marketType === "MCX" || "BFO" || "NFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-customGray text-sm">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.date}
                                  <sup className="text-xms text-customGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Additional Columns (Action, Buy Price, etc.) */}
                      <td
                        className={`p-4 text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : row.action === "BUY"
                            ? "text-scaleBlue"
                            : row.action === "SELL"
                            ? "text-stockRed"
                            : "text-stockDefault"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? "0"
                          : `${row.action === "SELL" ? "-" : ""}${Math.abs(
                              parseFloat(row.quantity || 0)
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </td>
                      {/* Conditional rendering for averagePrice */}
                      <td
                        className={`p-4 text-cellGray text-sm font-normal
             text-end ${
               row.position === "CLOSE"
                 ? "!bg-rowDisable !text-disableText"
                 : ""
             }`}
                      >
                        {row.position === "CLOSE"
                          ? "0.00"
                          : parseFloat(row.averagePrice || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                      </td>
                      {/* Conditional rendering for LTP */}
                      <td
                        className={`p-4 text-cellGray text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : ""
                        }`}
                      >
                        {parseFloat(row.ltp || 0) >= 0 ? "" : ""}
                        {parseFloat(row.ltp || 0).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`p-4 text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : parseFloat(row.profit || 0) >= 0
                            ? "bg-slate-50 text-textGreen"
                            : "bg-slate-50 text-stockRed"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? parseFloat(row.profitClose || 0) >= 0
                            ? "+"
                            : ""
                          : parseFloat(row.profit || 0) >= 0
                          ? "+"
                          : ""}
                        {row.position === "CLOSE"
                          ? parseFloat(row.profitClose || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : parseFloat(row.profit || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                      </td>

                      <td
                        className={`p-4 text-xs font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : parseFloat(row.percentageChange || 0) >= 0
                            ? "text-textGreen"
                            : "text-stockRed"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? "0.00%"
                          : `${parseFloat(row.percentageChange || 0).toFixed(
                              2
                            )}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-t text-customGray text-sm font-sans font-normal leading-4">
                    <td colSpan="4" className="p-4"></td>

                    <td className="p-4"></td>
                    <td className="p-4 text-end">Total P&L</td>

                    <td
                      className={`p-4 text-sm font-normal text-end text-wrap truncate
${parseFloat(totalProfit || 0) >= 0 ? "text-textGreen" : "text-stockRed"}`}
                    >
                      {parseFloat(totalProfit || 0) >= 0
                        ? `+${(totalProfit || 0).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : (totalProfit || 0).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="text-center text-gray-600">No data available</p>
            )}
            {/* Confirmation Modal */}
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmDeleteRow}
              message="Are you sure you want to delete this row?"
            />
          </div>
          {/* Third Row: Stock Details Table */}
          <>
            <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 pt-6">
              {/* Left Section: Holdings and Select */}
              <div className="flex items-center space-x-4 flex-grow">
                <span className="font-sans font-normal text-customGray text-lg leading-6 flex items-center">
                  Day's history
                  <span className="ml-1">({submittedData.length})</span>
                  <SlArrowUp className="ml-2" />
                </span>
              </div>

              {/* Right Section: Other elements */}
              <div className="flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 space-x-6 items-center pr-6">
                <div className="relative w-24">
                  <MdOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-customGray" />
                  <input
                    type="text"
                    placeholder="Search"
                    className="border border-borderWhite text-xs text-center w-full h-7 pl-6" // Reduced padding from pl-8 to pl-6
                  />
                </div>

                <span
                  className="flex items-center space-x-1 text-xs text-coustomBlue cursor-pointer"
                  onClick={toggleForm}
                >
                  <MdOutlineFileDownload className="h-4 w-4" />
                  <span className="leading-none">Download</span>
                </span>
                {showForm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="p-4 max-w-4xl mx-auto border border-gray-300 rounded-lg shadow-md bg-white">
                      <h2 className="text-xl font-bold text-gray-700 mb-3 text-center">
                        Add New Position
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-3">
                        {/* Pickers in two columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Position
                            </label>
                            <select
                              name="position"
                              value={formData.position}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="OPEN">OPEN</option>
                              <option value="CLOSE">CLOSE</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Order Type
                            </label>
                            <select
                              name="orderType"
                              value={formData.orderType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="MIS">MIS</option>
                              <option value="NRML">NRML</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Segment Type
                            </label>
                            <select
                              name="marketType"
                              value={formData.marketType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="NSE">NSE</option>
                              <option value="NFO">NFO</option>
                              <option value="BFO">BFO</option>
                              <option value="MCX">MCX</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Action
                            </label>
                            <select
                              name="action"
                              value={formData.action}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="BUY">BUY</option>
                              <option value="SELL">SELL</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Expiry
                            </label>
                            <select
                              name="expiryType"
                              value={formData.expiryType}
                              onChange={handlePickerChange}
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                            </select>
                          </div>
                        </div>
                        {/* Text Inputs in two columns */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Stock Name
                            </label>
                            <input
                              type="text"
                              name="stockName"
                              value={formData.stockName}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Stock Name"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Date
                            </label>
                            <input
                              type="text"
                              name="date"
                              value={formData.date}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Date"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              TH,RD,ND
                            </label>
                            <input
                              type="text"
                              name="thRdNd"
                              value={formData.thRdNd}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter TH RD ND"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Strike Price
                            </label>
                            <input
                              type="text"
                              step="0.01"
                              name="buyPrice"
                              value={formData.buyPrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Buy Price"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Quantity
                            </label>
                            <input
                              type="number"
                              name="quantity"
                              value={formData.quantity}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Quantity"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Average Price
                            </label>
                            <input
                              type="number"
                              name="averagePrice"
                              value={formData.averagePrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Average Price"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Prev Close
                            </label>
                            <input
                              type="number"
                              name="prevClose"
                              value={formData.prevClose}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Previous Close"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Min LTP
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              name="minLTP"
                              value={formData.minLTP}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Min LTP"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Max LTP
                            </label>
                            <input
                              type="number"
                              step="0.01"
                              name="maxLTP"
                              value={formData.maxLTP}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Max LTP"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                              Sell Price
                            </label>
                            <input
                              type="number"
                              name="sellPrice"
                              value={formData.sellPrice}
                              onChange={handleInputChange}
                              required
                              className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              placeholder="Enter Sell Price"
                            />
                          </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between mt-3">
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={toggleForm}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            Close Form
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
          <div>
            {submittedData.length > 0 ? (
              <table className=" table-fixed w-full">
                <thead>
                  <tr className="text-customGray text-xm font-sans font-normal leading-4 border-t">
                    {/* <th className="p-4 text-start font-sans text-headingGray font-normal h-11"></th> */}
                    <th className="p-4 text-start font-sans text-headingGray font-normal w-24 h-11">
                      Product
                    </th>
                    <th className="p-4 text-headingGray text-start font-sans font-normal w-40 h-11">
                      Instrument
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Qty.
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Avg.
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      LTP
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray bg-slate-50 w-24 h-11">
                      P&L
                    </th>
                    <th className="p-4 text-end font-sans font-normal text-headingGray w-20 h-11">
                      Chg.
                    </th>
                    <th className="w-2 h-11"></th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((row, index) => (
                    <tr
                      key={row.id}
                      onClick={() => handleRowClick(row.id)}
                      className={`border-t shadow-sm shadow-gray-100 ${
                        row.position === "CLOSE"
                          ? "bg-rowDisable !text-disableText"
                          : ""
                      }`}
                    >
                      {/* Checkbox */}
                      {/* <td className="p-4 text-center">
                          <input
            type="checkbox"
            checked={isRowSelected(index)}
            onChange={() => handleRowSelect(index)}
          />
                        </td> */}

                      {/* Order Type */}
                      <td className="p-4 text-cellGray text-xs font-normal text-center">
                        <span
                          className={`h-5 w-12 flex justify-center items-center -ml-1 ${
                            row.position === "CLOSE" &&
                            (row.expiryType === "Weekly" ||
                              row.expiryType === "Monthly")
                              ? "!bg-bgOff !text-disableText"
                              : row.orderType === "MIS"
                              ? "bg-productBg text-textProduct"
                              : row.orderType === "NRML"
                              ? "bg-purple-100 text-purple-800"
                              : ""
                          }`}
                        >
                          {row.orderType}
                        </span>
                      </td>

                      {/* Stock Details */}
                      <td
                        className={`p-4 text-start text-sm font-normal  flex items-center justify-start ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : "text-customGray"
                        }`}
                      >
                        <span className="mx-1 text-labelGray tracking-wider">
                          {row.marketType === "NSE" &&
                          row.expiryType === "Monthly" &&
                          row.position === "CLOSE" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px] ">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.position === "OPEN" &&
                            (row.expiryType === "Monthly" || "Weekly") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : (row.marketType === "NFO" || "BFO" || "MCX") &&
                            row.position === "CLOSE" &&
                            row.expiryType === "Monthly" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-headingGray text-sm">
                                  {row.buyPrice}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.position === "OPEN" &&
                            (row.expiryType === "Monthly" || "Weekly") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.marketType === "NSE" &&
                            row.expiryType === "Weekly" &&
                            row.position === "CLOSE" ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "OPEN" &&
                            row.expiryType === "Weekly" &&
                            (row.marketType === "NFO" || "MCX" || "BFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.date}
                                  <sup className="text-xms text-customGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "CLOSE" &&
                            row.expiryType === "Weekly" &&
                            (row.marketType === "NFO" || "MCX" || "BFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-headingGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-headingGray">
                                  {row.date}
                                  <sup className="text-xms text-headingGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-headingGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-secheadingGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : row.position === "OPEN" &&
                            row.expiryType === "Monthly" &&
                            (row.marketType === "MCX" || "BFO" || "NFO") ? (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-customGray text-sm">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          ) : (
                            <>
                              <span className="flex items-center whitespace-nowrap space-x-1">
                                <span className="text-customGray text-sm uppercase">
                                  {row.stockName}
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.date}
                                  <sup className="text-xms text-customGray">
                                    {row.thRdNd}
                                  </sup>
                                </span>
                                <span className="relative w-2.5 h-2.5 bg-weekBackground rounded-full flex items-center justify-center">
                                  <span className="text-xxs pt-1 text-weekText leading-none font-normal">
                                    W
                                  </span>
                                </span>
                                <span className="text-sm text-customGray">
                                  {row.buyPrice}
                                </span>
                                <span className="text-marketGray text-xs mt-[1px]">
                                  {row.marketType}
                                </span>
                              </span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Additional Columns (Action, Buy Price, etc.) */}
                      <td
                        className={`p-4 text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : row.action === "BUY"
                            ? "text-scaleBlue"
                            : row.action === "SELL"
                            ? "text-stockRed"
                            : "text-stockDefault"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? "0"
                          : `${row.action === "SELL" ? "-" : ""}${Math.abs(
                              parseFloat(row.quantity || 0)
                            ).toLocaleString("en-IN", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`}
                      </td>
                      {/* Conditional rendering for averagePrice */}
                      <td
                        className={`p-4 text-cellGray text-sm font-normal
                             text-end ${
                               row.position === "CLOSE"
                                 ? "!bg-rowDisable !text-disableText"
                                 : ""
                             }`}
                      >
                        {row.position === "CLOSE"
                          ? "0.00"
                          : parseFloat(row.averagePrice || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                      </td>
                      {/* Conditional rendering for LTP */}
                      <td
                        className={`p-4 text-cellGray text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : ""
                        }`}
                      >
                        {parseFloat(row.ltp || 0) >= 0 ? "" : ""}
                        {parseFloat(row.ltp || 0).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>
                      <td
                        className={`p-4 text-sm font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : parseFloat(row.profit || 0) >= 0
                            ? "bg-slate-50 text-textGreen"
                            : "bg-slate-50 text-stockRed"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? parseFloat(row.profitClose || 0) >= 0
                            ? "+"
                            : ""
                          : parseFloat(row.profit || 0) >= 0
                          ? "+"
                          : ""}
                        {row.position === "CLOSE"
                          ? parseFloat(row.profitClose || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )
                          : parseFloat(row.profit || 0).toLocaleString(
                              "en-IN",
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                      </td>

                      <td
                        className={`p-4 text-xs font-normal text-end ${
                          row.position === "CLOSE"
                            ? "!bg-rowDisable !text-disableText"
                            : parseFloat(row.percentageChange || 0) >= 0
                            ? "text-textGreen"
                            : "text-stockRed"
                        }`}
                      >
                        {row.position === "CLOSE"
                          ? "0.00%"
                          : `${parseFloat(row.percentageChange || 0).toFixed(
                              2
                            )}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-t text-customGray text-sm font-sans font-normal leading-4">
                    <td colSpan="4" className="p-4"></td>
                    <td className="p-4 text-end">Total P&L</td>
                    <td
                      className={`p-4 text-sm font-normal text-end text-wrap truncate
  ${parseFloat(totalProfit || 0) >= 0 ? "text-textGreen" : "text-stockRed"}`}
                    >
                      {parseFloat(totalProfit || 0) >= 0
                        ? `+${(totalProfit || 0).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}`
                        : (totalProfit || 0).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </td>
                    <td className="p-4"></td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="text-center text-gray-600">No data available</p>
            )}{" "}
            {/* Confirmation Modal */}
            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmDeleteRow}
              message="Are you sure you want to delete this row?"
            />
          </div>
          {/* Breakdown with scales */}
          <div className="block items-center space-x-4 mt-4">
            <span className="font-sans font-normal text-customGray text-lg leading-6 flex items-center border-b mb-8">
              Breakdown
            </span>

            {submittedData
              .sort((a, b) => (a.profit < 0 && b.profit >= 0 ? 1 : -1)) // Sort negative profit items to appear last
              .map((item, index) => (
                <div key={index}>
                  {/* Container for each stock's P&L line */}
                  <div className="relative flex-grow mt-4">
                    {/* Positive P&L Line (Blue) */}
                    {item.profit > 0 && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 origin-left flex items-end h-2 bg-scaleBlue"
                        style={{
                          width: `${Math.min((item.profit / 100) * 50, 50)}%`,
                        }}
                      />
                    )}

                    {/* Negative P&L Line (Red) */}
                    {item.profit < 0 && (
                      <div
                        className="absolute top-1/2 left-1/2 transform -translate-y-1/2 origin-left h-2 bg-stockRed"
                        style={{
                          width: `${Math.min(
                            (Math.abs(item.profit) / 100) * 50,
                            50
                          )}%`,
                          transform: "translateX(-100%)",
                        }}
                      />
                    )}

                    {/* Labels for positive P&L */}
                    {(item.action === "SELL" ? item.profitClose : item.profit) >
                      0 && (
                      <div className="absolute w-40 top-1/2 transform -translate-y-1/2 left-[calc(50%-167px)] ">
                        {item.expiryType === "Weekly" &&
                        (item.marketType === "MCX" ||
                          item.marketType === "BFO" ||
                          item.marketType === "NFO") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              {item.date}
                              <sup className="text-xms text-customGray">
                                {item.thRdNd}
                              </sup>
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              {item.buyPrice}
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              ({item.orderType})
                            </span>
                          </>
                        ) : item.marketType === "NSE" &&
                          (item.expiryType === "Weekly" || "Monthly") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              ({item.marketType})
                            </span>
                          </>
                        ) : item.expiryType === "Monthly" &&
                          (item.marketType === "MCX" ||
                            item.marketType === "BFO" ||
                            item.marketType === "NFO") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              {item.buyPrice}
                            </span>
                            <span className="text-customGray text-xs font-normal ml-1">
                              ({item.marketType})
                            </span>
                          </>
                        ) : null}
                      </div>
                    )}

                    {/* Labels for negative P&L */}
                    {(item.action === "SELL" ? item.profitClose : item.profit) <
                      0 && (
                      <div className=" w-40 absolute top-[calc(50%+4px)] transform -translate-y-1/2 left-[calc(50%+2px)]">
                        {item.expiryType === "Weekly" &&
                        (item.marketType === "MCX" ||
                          item.marketType === "BFO" ||
                          item.marketType === "NFO") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              {item.date}
                              <sup className="text-xms text-customGray">
                                {item.thRdNd}
                              </sup>
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              {item.buyPrice}
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              ({item.orderType})
                            </span>
                          </>
                        ) : item.marketType === "NSE" &&
                          (item.expiryType === "Weekly" || "Monthly") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              ({item.marketType})
                            </span>
                          </>
                        ) : item.expiryType === "Monthly" &&
                          (item.marketType === "MCX" ||
                            item.marketType === "BFO" ||
                            item.marketType === "NFO") ? (
                          <>
                            <span className="text-customGray text-xs font-normal">
                              {item.stockName}
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              {item.buyPrice}
                            </span>
                            <span className="text-customGray text-xs font-normal mr-1">
                              ({item.marketType})
                            </span>
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                  {/* <br /> after each line to ensure new line */}
                  <br />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Position;
