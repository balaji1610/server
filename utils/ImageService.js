const path = require("path");
const allExceriseId = require("./Exercises.json");
const getAllId = allExceriseId.map(({ id }) => id).sort();

const ImageService = () => {
  const imageList = getAllId.map((id) => {
    return { id: id, image: path.join(__dirname, `../images/${id}.gif`) };
  });

  return imageList;
};

module.exports = { ImageService };
