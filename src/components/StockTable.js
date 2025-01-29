import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { GoPeople } from "react-icons/go";
import { CgShapeCircle } from "react-icons/cg";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import TradeForm from "./TradeForm";
const StockTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 12;
  const [isTradeFormVisible, setIsTradeFormVisible] = useState(false);

  // Function to handle the Download click event
  const handleDownloadClick = () => {
    setIsTradeFormVisible(true);
  };

  // Function to close the TradeForm modal
  const handleClose = () => {
    setIsTradeFormVisible(false);
  };
  // Sample data (you can replace this with actual data)
  const stockData = [
    { stock: "RELIANCE", diff: "+10", percent: "+0.7%", value: "2,450.00" },
    { stock: "TCS", diff: "+35", percent: "+1.2%", value: "3,100.00" },
    { stock: "INFOSYS", diff: "+20", percent: "+0.6%", value: "1,750.00" },
    { stock: "HDFC BANK", diff: "-15", percent: "-0.4%", value: "1,640.00" },
    { stock: "ICICI BANK", diff: "+18", percent: "+1.0%", value: "870.00" },
    { stock: "HINDALCO", diff: "+8", percent: "+0.9%", value: "450.00" },
    {
      stock: "BAJAJ FINANCE",
      diff: "+100",
      percent: "+2.5%",
      value: "4,120.00",
    },
    { stock: "KOTAK BANK", diff: "+12", percent: "+0.8%", value: "1,920.00" },
    { stock: "ADANI PORTS", diff: "-25", percent: "-1.8%", value: "690.00" },
    { stock: "WIPRO", diff: "+5", percent: "+0.4%", value: "620.00" },
    { stock: "ONGC", diff: "-6", percent: "-0.6%", value: "100.00" },
    { stock: "L&T", diff: "+45", percent: "+1.5%", value: "3,100.00" },
    { stock: "ASIAN PAINTS", diff: "-10", percent: "-0.7%", value: "3,200.00" },
    {
      stock: "ULTRATECH CEMENT",
      diff: "+50",
      percent: "+1.3%",
      value: "7,800.00",
    },
    { stock: "ITC", diff: "+4", percent: "+0.3%", value: "370.00" },
    { stock: "TITAN", diff: "-20", percent: "-1.0%", value: "2,600.00" },
    { stock: "SUN PHARMA", diff: "+10", percent: "+0.9%", value: "1,100.00" },
    { stock: "HINDUNILVR", diff: "+25", percent: "+1.2%", value: "2,500.00" },
    { stock: "AXIS BANK", diff: "-12", percent: "-0.7%", value: "840.00" },
    { stock: "MARUTI", diff: "+80", percent: "+1.6%", value: "9,000.00" },
    { stock: "POWERGRID", diff: "+2", percent: "+0.2%", value: "230.00" },
    { stock: "NTPC", diff: "+3", percent: "+0.5%", value: "120.00" },
    { stock: "BHARTI AIRTEL", diff: "+6", percent: "+0.8%", value: "780.00" },
    { stock: "TATA MOTORS", diff: "+15", percent: "+1.4%", value: "450.00" },
    { stock: "COAL INDIA", diff: "-8", percent: "-0.9%", value: "220.00" },
    { stock: "JSW STEEL", diff: "+12", percent: "+0.9%", value: "720.00" },
    {
      stock: "TECH MAHINDRA",
      diff: "+20",
      percent: "+1.1%",
      value: "1,060.00",
    },
    { stock: "HCL TECH", diff: "+14", percent: "+0.8%", value: "1,160.00" },
    { stock: "GRASIM", diff: "-18", percent: "-0.6%", value: "1,760.00" },
    { stock: "M&M", diff: "+22", percent: "+1.0%", value: "1,370.00" },
    { stock: "BAJAJ AUTO", diff: "+28", percent: "+0.9%", value: "3,950.00" },
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

  return (
    <div className="ml-3 mr-2 font-sans mt-8">
    {/* Flex container for both tables */}
    <div className="flex flex-col lg:flex-row  lg:space-x-6">
      {/* Table 1: NIFTY/SENSEX Stock Data */}
      <div className="w-full lg:w-1/4 border-r border-gray-300">
          {/* First Row: Search Bar */}
          <div className="flex justify-between mb-0 pt-2 relative">
            {/* Search Bar */}
            <div className="relative w-full sm:w-full backdrop-brightness-200">
              <input
                type="text"
                placeholder="Search eg: infy bse, nifty fut, gold mcx"
                className="p-2 pl-10 pr-20 w-full text-customGray rounded-lg text-xs font-sans font-normal"
              />
              <MdOutlineSearch className="absolute top-2 left-2 w-4 h-4 text-customGray" />

              {/* Page number display */}
              <div className="absolute top-2 right-2 text-xs text-gray-400">
                {currentPage}/{totalPages}
              </div>
            </div>
          </div>

          {/* Second Row: Stock Data Table */}
          <div className="overflow-y-auto max-h-dvh">
            <table className="w-full table-auto">
              <tbody>
                {paginatedData.map((row, index) => (
                  <tr
                    key={index}
                    className="border-t shadow-sm shadow-gray-100"
                  >
                    <td className="p-2 text-customGray text-xs font-medium ml-1 text-wrap">
                      {row.stock}{" "}
                      <span className="mr-1 text-center text-xxs text-labelGray">
                        index
                      </span>
                    </td>
                    <td className="p-1 text-customGray text-xs font-medium text-start w-8">
                      {row.diff}
                    </td>
                    <td className="p-1 text-xs font-medium text-end w-8">
                      {parseFloat(row.percent) < 0 ? (
                        <span className="flex items-center space-x-1">
                          <span className="text-customGray">{row.percent}</span>
                          <SlArrowDown className="text-stockRed" />
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1">
                          <span className="text-customGray">{row.percent}</span>
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
          </div>

          {/* Pagination and Settings Icon */}
          <div className="fixed bottom-0 left-0 bg-white w-1/4 mx-auto shadow-md z-10 border-t">
            <div className="flex justify-between items-center max-w-screen-xl mx-auto">
              {/* Pagination: Page numbers */}
              <div className="flex overflow-x-auto">
                {[...Array(totalPages).keys()].map((page) => (
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

              {/* Settings Icon */}
              <div className="flex items-center space-x-2 pr-2">
                <CiSettings className="w-6 h-6 text-customGray cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
  
      {/* Table 2: Holdings Data */}
      <div className="w-full lg:w-9/12">
      <>
        {/* First Row: Holdings Information */}
        <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 pt-4">
          {/* Left Section: Holdings and Select */}
          <div className="flex items-center flex-grow">
            <span className="font-sans font-light text-customGray text-lg leading-6">Holdings</span>
            <span className="ml-1 mr-2">(1)</span>
            <select className="border text-xs border-borderWhite w-32 h-7 text-customGray font-normal p-2">
              <option>All Stocks</option>
            </select>
          </div>
          {/* Right Section: Other elements */}
          <div className="flex items-center space-x-6 pr-6">
          <div className="relative w-24">
                <MdOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-customGray" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-borderWhite text-xs text-center w-full h-7 pl-8"
                />
              </div>
            <div className="flex items-center space-x-1 text-xs text-coustomBlue">
              <CiLock />
              <span>Authorization</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-coustomBlue">
              <GoPeople />
              <span>Family</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-coustomBlue">
              <CgShapeCircle />
              <span>Analytics</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-coustomBlue cursor-pointer" onClick={handleDownloadClick} >
              <MdOutlineFileDownload />
              <span>Download</span>
            </div>
          </div>
        </div>
        {/* Render TradeForm as a modal if isTradeFormVisible is true */}
        {isTradeFormVisible && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6">
            <TradeForm /> {/* Your TradeForm component */}
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </> 
        {/* Second Row: Stock Details Table */}
        <table className="w-full table-auto">
          <thead>
            <tr className="text-xs text-headingGray font-extralight border-t">
              <th className="p-2 text-start font-normal border-r w-80 h-11">Instrument</th>
              <th className="p-2 text-end font-normal w-40 h-11">QTY</th>
              <th className="p-2 text-end font-normal w-40 h-11">Avg Cost</th>
              <th className="p-2 text-end font-normal border-r w-40 h-11">LTP</th>
              <th className="p-2 text-end font-normal w-40 h-11">Cur. Value</th>
              <th className="p-2 text-end font-normal bg-slate-50 w-40 h-11">P&L</th>
              <th className="p-2 text-end font-normal w-40 h-11">Net Chg.</th>
              <th className="p-2 text-end font-normal w-40 h-11">Day Chg.</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t shadow-sm shadow-gray-100">
              <td className="p-2 text-xs text-customGray font-normal text-start border-r  w-80 h-11">Stock A</td>
              <td className="p-2 text-xs text-cellGray font-normal text-end w-40 h-11">50</td>
              <td className="p-2 text-xs text-cellGray font-normal text-end w-40 h-11">1500.00</td>
              <td className="p-2 text-xs text-cellGray font-normal text-end border-r w-40 h-11">1525.00</td>
              <td className="p-2 text-xs text-cellGray font-normal text-end w-40 h-11">76,250.00</td>
              <td className="p-2 text-xs text-textGreen font-normal text-end w-40 h-11">+1,250.00</td>
              <td className="p-2 text-xs text-textGreen font-normal text-end w-40 h-11">+2.5%</td>
              <td className="p-2 text-xs text-textGreen font-normal text-end w-40 h-11">+10.00</td>
            </tr>
          </tbody>
        </table>
  
        {/* Summary Table */}
        <table className="w-full table-auto mt-4">
  <thead>
    <tr className="text-xs text-headingGray font-extralight">
      <th className="p-2 text-start font-extralight">Total Investment</th>
      <th className="p-2 text-start font-extralight">Current Value</th>
      <th className="p-2 text-start font-extralight">Day's P&L</th>
      <th className="p-2 text-start font-extralight">Total P&L</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-t shadow-sm shadow-gray-100">
      <td className="p-2 text-xs text-customGray font-normal">₹500</td>
      <td className="p-2 text-xs text-customGray font-normal">₹525,00</td>
      <td className="p-2 text-xs text-textGreen font-normal ">+₹500</td>
      <td className="p-2 text-xs text-textGreen font-normal ">+₹25,00</td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  </div>
  
  );
};

export default StockTable;
