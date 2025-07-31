const path = require("path");
const allExceriseId = require("./Exercises.json");
const getAllId = allExceriseId.map(({ exerciseId }) => exerciseId).sort();

const ImageService = () => {
  const imageList = getAllId.map((exerciseId) => {
    return {
      exerciseId: exerciseId,
      image: path.join(__dirname, `../images/${exerciseId}.gif`),
    };
  });

  return imageList;
};

module.exports = { ImageService };
