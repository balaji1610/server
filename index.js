const express = require("express");
const cors = require("cors");
const path = require("path");

const exercises = require("./utils/Exercises.json");
const list = require("./utils/Bodypartlist");
const images = require("./utils/ImageService");
const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

//status

app.get("/status", (req, res) => {
  res.status(200).send("Server is Running !!!!!");
});

app.get("/exercises", (req, res) => {
  res.status(200).send(exercises);
});

//bodypartlist
app.get("/exercises/bodyPartList", (req, res) => {
  res.status(200).send(list.bodypartlist());
});

//bodyPart
app.get("/exercises/bodyPart/:bodypart", (req, res) => {
  const getBodyPart = exercises.filter((el) => {
    return el.bodyPart === req.params.bodypart;
  });
  if (getBodyPart.length) {
    res.status(200).send(getBodyPart);
  } else {
    res.status(404).send("Not Found");
  }
});

app.get("/image", (req, res) => {
  const { exerciseId } = req.query;
  const findImageId = images
    .ImageService()
    .filter((el) => el.id == exerciseId)
    .map((el) => {
      return el.image;
    });
  if (findImageId.length) {
    res.sendFile(findImageId[0]);
  } else {
    const noImage = path.join(__dirname, "./images/no-image-available.png");
    res.sendFile(noImage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
