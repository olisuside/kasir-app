const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  screens:{
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin": {
          scrollbarWidth: "thin",
          scrollbarcolor : "rgba(0, 0, 0, 0.2)"
        },
        ".scrollbar-webkit": {
          "&::-webkit-scrollbar": {
<<<<<<< HEAD
            width: "6px",
=======
            width: "2px",
>>>>>>> b8e6bb1f56836111bbf8fb8c0da64e434f358ab9
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(0, 0, 0, 0.2)",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
<<<<<<< HEAD
            borderRadius : "20px",
            border : "1px solid white" 
=======
            borderRadius : "10px",
            border : "1px transparent white" 
>>>>>>> b8e6bb1f56836111bbf8fb8c0da64e434f358ab9
          },
        },
        
      }

      addUtilities(newUtilities)
    }
  ],
})

