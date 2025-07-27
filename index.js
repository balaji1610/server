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
  res.status(200).send("<h1>Server is Running !!!!!</h1>");
});

//exercises
app.get("/exercises", (req, res) => {
  res.status(200).send(exercises);
});

//exercises:id
app.get("/exercises/id/:id", (req, res) => {
  const getId = exercises.filter((el) => {
    return el.id == req.params.id;
  });
  if (getId.length) {
    res.status(200).send(getId);
  } else {
    res.status(404).send("Not Found Id");
  }
});

//exercises/target/:target
app.get("/exercises/target/:target", (req, res) => {
  console.log(req.params.target);
  const getTarget = exercises.filter((el) => {
    return el.target === req.params.target;
  });

  if (getTarget.length) {
    res.status(200).send(getTarget);
  } else {
    res.status(404).send("Not Found Target");
  }
});

//exercises/equipment/:equipment
app.get("/exercises/equipment/:equipment", (req, res) => {
  const getequipment = exercises.filter((el) => {
    return el.equipment === req.params.equipment;
  });

  if (getequipment.length) {
    res.status(200).send(getequipment);
  } else {
    res.status(404).send("Not Found equipment");
  }
});

//bodypartlist
app.get("/exercises/bodyPartList", (req, res) => {
  console.log("bodyPartList");
  res.status(200).send(list.bodypartlist());
});

//exercises/bodyPart/:bodyPart
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

//image/:id
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
