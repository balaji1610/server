const path = require("path");

const ImageService = () => {
  const imageList = [
    { id: "0001", image: path.join(__dirname, "../images/0001.gif") },
    { id: "0002", image: path.join(__dirname, "../images/0002.gif") },
    { id: "0003", image: path.join(__dirname, "../images/0003.gif") },
    { id: "0006", image: path.join(__dirname, "../images/0006.gif") },
    { id: "0007", image: path.join(__dirname, "../images/0007.gif") },
    { id: "0009", image: path.join(__dirname, "../images/0009.gif") },
    { id: "0010", image: path.join(__dirname, "../images/0010.gif") },
    { id: "0011", image: path.join(__dirname, "../images/0011.gif") },
    { id: "0012", image: path.join(__dirname, "../images/0012.gif") },
    { id: "0013", image: path.join(__dirname, "../images/0013.gif") },
  ];
  return imageList;
};

module.exports = { ImageService };
