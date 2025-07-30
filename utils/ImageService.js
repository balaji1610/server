const path = require("path");
const allExceriseId = require("./Exercises.json");
const getAllId = allExceriseId.map(({ exerciseId }) => exerciseId).sort();

const ImageService = () => {
  const imageList = getAllId.map((id) => {
    return { id: id, image: path.join(__dirname, `../images/${id}.gif`) };
  });

  return imageList;
};

module.exports = { ImageService };
