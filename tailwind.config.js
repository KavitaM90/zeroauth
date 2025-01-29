/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      height: {
        '80vh': '80vh', // Custom height class
      },
      marginTop:{
        '1px':'1px'
      },
      colors: {
        textGray:"#A2A2A2",
        text2Gray:"#A3A3A3",
        borderGray:"#D1D5DB",
        iconGray:"#DADADA",
        coustomBlue:"#4184F3",
        customGray: "#444444",
        marketGray:"#7C7C7C",
        bgWhite: "#FFFFFF",
        bgPurple:"#F5F0F7",
        textPurple:"#574182",
        textOff:"#929292",
        bgOff:"#F1F1F1",
        borderWhite:"#EEEEEE",
        iconRed:"#F6461A",
        headingGray:"#9B9B9B",
        secheadingGray:"#B8B8B8",
        textGreen:"#4CAF50",
        cellGray:"#444A50",
        stockRed:"#FF5722",
        productBg:"#FAF3EA",
        textProduct:"#D38535",
        scaleBlue:"#4F85F6",
        labelGray:"#B1B1B1",
        navActive:"#F5550F",
        rowDisable:"#F8F8F8",
        disableText:"#C2C2C2",
        closeText:"#A1A4A7",
        weekText:"#5B97DE",
        weekBackground:"#ECF2FE",

     },
     fontSize: {
      xs: "10px",
      xms:"9px",
      xxs: "6px",
      xm:"12px",
      xml:"28px",
    },
    },
  },
  plugins: [],
}

