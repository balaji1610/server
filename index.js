const express = require("express");
const cors = require("cors");
const path = require("path");
const url = require("url");

const exercises = require("./utils/Exercises.json");
const list = require("./utils/Bodypartlist");
const images = require("./utils/ImageService");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

const apiCallsCount = [
  {
    apiCall: "/exercises",
    count: 0,
  },
  {
    apiCall: "/exercises/bodyPartList",
    count: 0,
  },
  {
    apiCall: "/exercises/bodyPart",
    count: 0,
  },
  {
    apiCall: "/image",
    count: 0,
  },
];

//status

function ApiCount(call) {
  return apiCallsCount.map((el) => {
    return el.apiCall === call ? { ...el, count: el.count++ } : el;
  });
}

app.get("/status", (req, res) => {
  res.status(200).send("<h1>Server is Running !!!!!</h1>");
});

app.get("/exercises", (req, res) => {
  ApiCount(req.path);
  res.status(200).send(exercises);
});

//bodypartlist
app.get("/exercises/bodyPartList", (req, res) => {
  ApiCount(req.path);
  res.status(200).send(list.bodypartlist());
});

//bodyPart
app.get("/exercises/bodyPart/:bodypart", (req, res) => {
  ApiCount("/exercises/bodyPart");
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
  ApiCount(req.path);
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

//apiCallsCount
app.get("/apiCallsCount", (req, res) => {
  const totalapiCount = apiCallsCount
    .map((el) => {
      return el.count;
    })
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);
  const totalCount = [...apiCallsCount, { totalapiCounts: totalapiCount }];

  res.status(200).send(totalCount);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
