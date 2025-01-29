import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { CgShapeCircle } from "react-icons/cg";
import { MdOutlineFileDownload } from "react-icons/md";
import { useState } from "react";
import { CiSettings } from "react-icons/ci";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
const Position = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const rowsPerPage = 12
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
  const data = [
    { name: "Stock A", product: "CNC", pnl: 50 },
    { name: "Stock B", product: "CNC", pnl: -30 },
    { name: "Stock C", product: "CNC", pnl: 20 },
    { name: "Stock D", product: "CNC", pnl: -10 },
  ];
  const positionData = [
    {
      product: "CNC",
      instrument: "Stock A",
      qty: 5,
      avg: 1525,
      ltp: 76250,
      pl: 1250,
      change: 2.5,
    },
    {
      product: "CNC",
      instrument: "Stock B",
      qty: 10,
      avg: 500,
      ltp: 5000,
      pl: -500,
      change: -1.0,
    },
    // Add more rows as needed
  ];
  // logic to calculate total p&L
  const totalPL = positionData.reduce((total, row) => total + row.pl, 0);
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
    <div className="mx-3 font-sans mt-12">
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
          {/* First Row: Holdings Information */}
          <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 pt-4">
            {/* Left Section: Holdings and Select */}
            <div className="flex items-center flex-grow">
              <span className="font-sans font-light text-customGray text-lg leading-6">
                Positions
              </span>
              <span className="ml-1">(1)</span>
            </div>

            {/* Right Section: Other elements */}
            <div className="flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 space-x-6 items-center pr-6">
              <div className="relative w-24">
                <MdOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-customGray" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-borderWhite text-xs text-center w-full h-7 pl-8"
                />
              </div>

              <span className="flex items-center space-x-1 text-xs text-coustomBlue">
                <CgShapeCircle />
                <span>Analytics</span>
              </span>
              <span className="flex items-center space-x-1 text-xs text-coustomBlue">
                <MdOutlineFileDownload />
                <span>Download</span>
              </span>
            </div>
          </div>

          {/* Second Row: Stock Details Table */}
          <table className="w-full table-auto">
            <thead>
              <tr className="text-customGray text-xs font-sans font-extralight leading-4 border-t">
                <th className="p-4 font-sans text-left font-extralight w-7 h-11">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded-sm"
                  />
                </th>
                <th className="text-headingGray p-4 text-center text-xm font-sans font-normal w-24 h-11">
                  Product
                </th>
                <th className="text-headingGray p-4 text-start text-xm font-sans font-normal w-80 h-11">
                  Instrument
                </th>
                <th className="p-4 text-end text-headingGray text-xm font-sans font-normal w-40 h-11">
                  QTY
                </th>
                <th className="p-4 text-end text-headingGray text-xm font-sans font-normal w-40 h-11">
                  Avg
                </th>
                <th className="p-4 text-end text-headingGray text-xm font-sans font-normal w-40 h-11">
                  LTP
                </th>
                <th className="p-4 text-end text-headingGray text-xm font-sans font-normal bg-slate-50 w-40 h-11">
                  P&L
                </th>
                <th className="p-4 text-end text-headingGray text-xm font-sans font-normal w-40 h-11">
                  Chg.
                </th>
              </tr>
            </thead>
            <tbody>
              {positionData.map((row, index) => (
                <tr key={index} className="border-t shadow-sm shadow-gray-100">
                  <td className="p-4 cellGray text-xs font-medium">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded-sm"
                    />
                  </td>
                  <td className="p-4 text-cellGray text-xs text-start font-medium">
                    <span className="bg-productBg h-5 w-12 text-textProduct flex items-center ml-auto px-3">
                      {row.product}
                    </span>
                  </td>
                  <td className="p-4 text-start text-customGray text-sm font-medium flex justify-start">
                    {row.instrument}
                    <span className="mx-1 text-xs text-labelGray">index</span>
                    <span className="bg-productBg h-3 w-10 text-textProduct text-xms flex items-center justify-center ml-2 mt-1">
                      HOLDING
                    </span>
                  </td>
                  <td className="p-4 text-end text-scaleBlue text-sm font-medium">
                    {row.qty}
                  </td>
                  <td className="p-4 text-end text-cellGray text-sm font-medium">
                    {row.avg.toFixed(2)}
                  </td>
                  <td className="p-4 text-end text-cellGray text-sm font-medium">
                    {row.ltp.toLocaleString()}
                  </td>
                  <td
                    className={`p-4 text-end ${
                      row.pl > 0 ? "text-textGreen" : "text-stockRed"
                    } text-sm font-medium bg-slate-50`}
                  >
                    {row.pl > 0 ? `+${row.pl}` : row.pl}
                  </td>
                  <td
                    className={`p-4 text-end ${
                      row.change > 0 ? "text-textGreen" : "text-stockRed"
                    } text-sm font-normal`}
                  >
                    {row.change > 0 ? `+${row.change}%` : `${row.change}%`}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t text-customGray text-xs font-sans font-extralight leading-4">
                <td colSpan="5" className="p-2"></td>
                <td className="p-2 text-end text-customGray">Total P&L</td>
                <td
                  className={`p-2 text-end text-sm font-normal ${
                    totalPL > 0 ? "text-textGreen" : "text-stockRed"
                  }`}
                >
                  {totalPL > 0 ? `+₹${totalPL}` : `-₹${Math.abs(totalPL)}`}
                </td>
                <td className="p-2"></td>
              </tr>
            </tfoot>
          </table>

          {/* Third Row: Stock Details Table */}
          <div className="flex flex-col sm:flex-row justify-between mb-4 space-y-4 sm:space-y-0 pt-6">
            {/* Left Section: Holdings and Select */}
            <div className="flex items-center space-x-4 flex-grow">
              <span className="font-sans font-light text-customGray text-lg leading-6 flex items-center">
                Day's history
                <span className="ml-1">(1)</span>
                <SlArrowUp className="ml-2" />{" "}
                {/* Added margin-left for spacing */}
              </span>
            </div>
            {/* Right Section: Other elements */}
            <div className="flex flex-wrap sm:flex-nowrap space-y-4 sm:space-y-0 space-x-6 items-center pr-6">
              <div className="relative w-24">
                <MdOutlineSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 w-4 h-4 text-customGray" />
                <input
                  type="text"
                  placeholder="Search"
                  className="border border-borderWhite text-xs text-center w-full h-7 pl-8"
                />
              </div>
              <span className="flex items-center space-x-1 text-xs text-coustomBlue">
                <MdOutlineFileDownload />
                <span>Download</span>
              </span>
            </div>
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr className="text-customGray text-xm font-sans font-normal leading-4 border-t">
                <th className="p-4 text-start font-sans text-headingGray font-normal w-40 h-11">
                  Product
                </th>
                <th className="p-4 text-headingGray text-start font-sans font-normal w-72 h-11">
                  Instrument
                </th>
                <th className="p-4 text-end font-sans font-normal text-headingGray w-40 h-11">
                  QTY
                </th>
                <th className="p-4 text-end font-sans font-normal text-headingGray w-40 h-11">
                  Avg
                </th>
                <th className="p-4 text-end font-sans font-normal text-headingGray w-40 h-11">
                  LTP
                </th>
                <th className="p-4 text-end font-sans font-normal text-headingGray bg-slate-50 w-60 h-11">
                  P&L
                </th>
                <th className="p-4 text-end font-sans font-normal text-headingGray w-40 h-11">
                  Chg.
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t shadow-sm shadow-gray-100">
                <td className="p-4 text-cellGray text-xs font-medium text-center">
                  <span className="bg-productBg h-5 w-12 text-textProduct flex justify-center items-center -ml-1">
                    CNC
                  </span>
                </td>
                <td className="p-4 text-start text-customGray text-sm font-medium flex items-center justify-start">
                  Stock A
                  <span className="mx-1 text-xs text-labelGray">index</span>
                </td>
                <td className="p-4 text-scaleBlue text-sm font-medium text-end">
                  5
                </td>
                <td className="p-4 text-cellGray text-sm font-medium text-end">
                  1525.00
                </td>
                <td className="p-4 text-cellGray text-sm font-medium text-end">
                  76,250.00
                </td>
                <td className="p-4 text-textGreen text-sm font-medium bg-slate-50 text-end">
                  +50
                </td>
                <td className="p-4 text-textGreen text-sm font-normal text-end">
                  +2.5%
                </td>
              </tr>
              <tr className="border-t shadow-sm shadow-gray-100">
                <td className="p-4 text-cellGray text-xs font-medium text-center">
                  <span className="bg-productBg h-5 w-12 text-textProduct flex justify-center items-center -ml-1">
                    CNC
                  </span>
                </td>
                <td className="p-4 text-start text-customGray text-sm font-medium flex items-center justify-start">
                  Stock B
                  <span className="mx-1 text-xs text-labelGray">index</span>
                </td>
                <td className="p-4 text-scaleBlue text-sm font-medium text-end">
                  10
                </td>
                <td className="p-4 text-cellGray text-sm font-medium text-end">
                  500.00
                </td>
                <td className="p-4 text-cellGray text-sm font-medium text-end">
                  5,000.00
                </td>
                <td className="p-4 text-stockRed text-sm font-medium bg-slate-50 text-end">
                  -30
                </td>
                <td className="p-4 text-stockRed text-sm font-normal text-end">
                  -1.5%
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
            <tfoot>
              <tr className="border-t text-customGray text-xs font-sans font-extralight leading-4">
                <td colSpan="2" className="p-4"></td>
                <td className="p-4 text-left"></td>
                <td className="p-4 text-textGreen text-end text-sm font-normal"></td>
                <td className="p-4 text-end"> Total P&L</td>
                <td className="p-4 text-textGreen text-end text-sm font-normal">
                  +₹20
                </td>
                {/* <td className={`p-4 text-end text-sm font-normal ${totalPL > 0 ? 'text-textGreen' : 'text-textRed'}`}>
      {totalPL > 0 ? `+₹${totalPL}` : `-₹${Math.abs(totalPL)}`}
    </td> */}
              </tr>
            </tfoot>
          </table>

          {/* Breakdown with scales */}
          <div className="block items-center space-x-4 mt-4">
            <span className="font-sans font-light text-customGray text-lg leading-6 flex items-center border-b mb-8">
              Breakdown
            </span>

            {data.map((item, index) => (
              <div key={index}>
                {/* Container for each stock's P&L line */}
                <div className="relative flex-grow mt-4">
                  {/* Positive P&L Line (Blue) */}
                  {item.pnl > 0 && (
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 origin-left h-2 bg-scaleBlue`}
                      style={{
                        width: `${Math.min((item.pnl / 100) * 50, 50)}%`, // Adjust width based on P&L
                      }}
                    />
                  )}

                  {/* Negative P&L Line (Red) */}
                  {item.pnl < 0 && (
                    <div
                      className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 origin-left h-2 bg-stockRed`}
                      style={{
                        width: `${Math.min(
                          (Math.abs(item.pnl) / 100) * 50,
                          50
                        )}%`, // Adjust width based on P&L
                        transform: "translateX(-100%)", // Shift to grow from center to left
                      }}
                    />
                  )}

                  {/* Labels for positive P&L */}
                  {item.pnl > 0 && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-[calc(50%-72px)]">
                      <span className="text-customGray text-xs font-medium">
                        {item.name}
                      </span>
                      <span className="text-customGray text-xs font-medium ml-1">
                        ({item.product})
                      </span>
                    </div>
                  )}

                  {/* Labels for negative P&L */}
                  {item.pnl < 0 && (
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-[calc(50%+2px)]">
                      <span className="text-customGray text-[10px] font-medium mr-1">
                        {item.name}
                      </span>
                      <span className="text-customGray text-[10px] font-medium">
                        ({item.product})
                      </span>
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
