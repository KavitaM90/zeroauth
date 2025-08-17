import React, { useState } from "react";
//import { CiBellOn } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useMarketData } from "../custom/useMarketData";
import arrow from "../assets/arrow.jpg";
import bell from "../assets/bell.png";
import cart from "../assets/cart.png";

const Nav = ({ onLogout }) => {
  const { marketData } = useMarketData();
  const [showLogout, setShowLogout] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
// <<<<<<< Updated upstream
//     // Removed 'overflow-hidden' from the nav element to allow dropdown to show
//     <nav className="fixed top-0 left-0 w-full bg-bgWhite p-0 shadow-md z-50 flex items-center h-12">
//       {/* Left Section: NIFTY and SENSEX */}
//       <div className="flex-[1_1_33.33%] flex items-center font-sans justify-between border-r border-borderGray px-2 h-full">
// =======
    <nav className="fixed top-0 left-0 w-full bg-bgWhite p-0 shadow-md z-50 flex items-center h-12">
      {/* Left Section: NIFTY and SENSEX */}
      <div className="flex-[1_1_33.33%] flex items-center justify-between border-r border-borderGray px-2 h-full">
        <div className="flex space-x-4 ">
          {/* Nifty Section */}
          <div className="text-customGray text-xm font-normal">
            {marketData?.["nifty50"]
              ? String(marketData["nifty50"]).toUpperCase()
              : ""}

            {/* <span
              className={`ml-1 text-xm font-normal ${
                marketData?.["nifty-prev-close"] > marketData?.["niftyLTP"]
                  ? "text-lossRed"
                  : "text-textGreen"
              }`}
            >
              {marketData?.["niftyLTP"] !== undefined &&
              marketData["niftyLTP"] !== null
======= */}
            <span className="text-textGreen ml-1 text-xm font-normal">
              {marketData?.["niftyLTP"] !== undefined && marketData["niftyLTP"] !== null
                ? parseFloat(marketData["niftyLTP"]).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}
            </span>
{/* <<<<<<< Updated upstream

            <span className="text-text2Gray ml-1 text-xs font-normal">
              {marketData?.["niftyDiff"] !== undefined &&
              marketData["niftyDiff"] !== null
                ? parseFloat(marketData["niftyDiff"]).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}

              {marketData?.["niftyPercentageChange"] !== undefined &&
                marketData["niftyPercentageChange"] !== null && (
                  <span className="ml-[2px]">
                    (
                    {parseFloat(marketData["niftyPercentageChange"]).toFixed(2)}
                    %)
======= */}
            <span className="text-text2Gray ml-1 text-xs font-normal">
              {marketData?.["niftyDiff"] !== undefined && marketData["niftyDiff"] !== null
                ? parseFloat(marketData["niftyDiff"]).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}

              {marketData?.["niftyPercentageChange"] !== undefined &&
                marketData["niftyPercentageChange"] !== null && (
                  <span className="ml-[2px]">
                    ({parseFloat(marketData["niftyPercentageChange"]).toFixed(2)}%)
                  </span>
                )}
            </span>
          </div>

          {/* Sensex Section */}
          <div className="text-customGray text-xm font-normal">
            {marketData?.["sensex"]
              ? String(marketData["sensex"]).toUpperCase()
              : ""}

{/* <<<<<<< Updated upstream
            <span
              className={`ml-1 text-xm font-normal ${
                marketData?.["sensex-prev-close"] > marketData?.["sensexLTP"]
                  ? "text-lossRed"
                  : "text-textGreen"
              }`}
            >
              {marketData?.["sensexLTP"] !== undefined &&
              marketData["sensexLTP"] !== null
======= */}
            <span className="text-textGreen ml-1 text-xm font-normal">
              {marketData?.["sensexLTP"] !== undefined && marketData["sensexLTP"] !== null
                ? parseFloat(marketData["sensexLTP"]).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}
            </span>
{/* <<<<<<< Updated upstream

            <span className="text-text2Gray ml-1 text-xs font-normal">
              {marketData?.["sensexDiff"] !== undefined &&
              marketData["sensexDiff"] !== null
======= */}
            <span className="text-text2Gray ml-1 text-xs font-normal">
              {marketData?.["sensexDiff"] !== undefined && marketData["sensexDiff"] !== null
                ? parseFloat(marketData["sensexDiff"]).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}

              {marketData?.["sensexPercentageChange"] !== undefined &&
                marketData["sensexPercentageChange"] !== null && (
                  <span className="ml-[2px]">
{/* <<<<<<< Updated upstream
                    (
                    {parseFloat(marketData["sensexPercentageChange"]).toFixed(
                      2
                    )}
                    %)
======= */}
                    ({parseFloat(marketData["sensexPercentageChange"]).toFixed(2)}%)
                  </span>
                )}
            </span>
          </div>
        </div>
      </div>

      {/* Hamburger Button for Mobile */}
      <div className="sm:hidden flex items-center px-4">
        <button
          id="hamburger-btn"
          className="text-customGray focus:outline-none"
          onClick={() =>
            document.getElementById("mobile-menu").classList.toggle("hidden")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
{/* 
<<<<<<< Updated upstream
      {/* Right Section: Navigation Links */}
      {/* <div className="hidden sm:flex flex-[2_1_66.66%] items-stretch justify-between px-4 h-full"> */}
        {/* Left: Icon */}

      {/* Right Section: Navigation Links and User Info */}
      <div className="hidden sm:flex flex-[2_1_66.66%] items-stretch justify-between px-4 h-full">
        {/* Left: Icon (Using BiSolidTagAlt as it was imported) */}
        <div className="flex items-center">
          <img
            alt="icon"
            src={arrow}
            className="w-5.5 h-3.5 text-iconRed transform rotate-360"
          />
        </div>

        {/* Right: Links and User Info */}
        <div className="flex items-center space-x-6">
          <div className="flex space-x-6">
            {[
              { to: "/dashboard", label: "Dashboard" },
              { to: "/orders", label: "Orders" },
              { to: "/holdings", label: "Holdings" },
              { to: "/positions", label: "Positions" },
              { to: "/bids", label: "Bids" },
              { to: "/funds", label: "Funds" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-openSans font-normal text-sm ${
                  currentPath === link.to ? "text-navActive" : "text-customGray"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Vertical Line */}
          <div className="h-full border-l border-borderGray"></div>

          {/* Cart Icon */}
          <img
            src={cart}
            alt="cart"
            className="h-4 w-4 cursor-pointer text-customGray"
          />

          {/* Bell Icon */}
          <img
            src={bell}
            alt="bell"
            className="h-4 w-4 cursor-pointer text-customGray"
          />
          {/* Bell Icon (Using CiBellOn as it was imported) */}
          {/* <CiBellOn className="h-6 w-6 cursor-pointer text-customGray" /> */}

          {/* User Info with Logout Dropdown */}
          <div className="relative">
            {/* Profile clickable area */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setShowLogout((prev) => !prev)}
            >
              <div className="h-9 w-9 rounded-full flex items-center justify-center font-normal text-xs text-profileText bg-profileBg uppercase">
                {marketData?.["profile-name"]?.[0] || ""}
              </div>
              <span className="text-sm text-customGray capitalize">
                {marketData?.["username"] || ""}
              </span>
            </div>

            {/* Logout dropdown */}
            {showLogout && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg z-50">
                <button
                  onClick={onLogout}
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Dropdown Menu */}
      <div
        id="mobile-menu"
        className="hidden absolute top-full left-0 w-full bg-bgWhite shadow-md sm:hidden"
      >
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/orders", label: "Orders" },
          { to: "/holdings", label: "Holdings" },
          { to: "/positions", label: "Positions" },
          { to: "/bids", label: "Bids" },
          { to: "/funds", label: "Funds" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`block px-4 py-2 font-openSans font-normal text-sm ${
              currentPath === link.to ? "text-navActive" : "text-customGray"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;