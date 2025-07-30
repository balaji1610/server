const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const exercises = require("../utils/Exercises.json");
const sequelize = require("./config/db");
const list = require("../utils/Bodypartlist");
const images = require("../utils/ImageService");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(cors());

const defineExcerise = require("./models/exceriseModel");
const defineSecondaryMuscle = require("./models/secondaryMuscleModel");
const defineInstructions = require("./models/instructionsModel");

const Excerise = defineExcerise(sequelize);
const SecondaryMuscle = defineSecondaryMuscle(sequelize);
const Instructions = defineInstructions(sequelize);

// Associations
Excerise.hasMany(SecondaryMuscle, {
  foreignKey: "exerciseId",
  sourceKey: "exerciseId",
});
SecondaryMuscle.belongsTo(Excerise, {
  foreignKey: "exerciseId",
  targetKey: "exerciseId",
});
Instructions.belongsTo(Excerise, {
  foreignKey: "exerciseId",
  targetKey: "exerciseId",
});

module.exports = {
  sequelize,
  Excerise,
  SecondaryMuscle,
  Instructions,
};

(async () => {
  try {
    await sequelize.sync();

    const exceriseData = exercises.map((el) => {
      const {
        bodyPart,
        equipment,
        exerciseId,
        name,
        target,
        description,
        difficulty,
        category,
      } = el;
      return {
        bodyPart,
        equipment,
        exerciseId,
        name,
        target,
        description,
        difficulty,
        category,
      };
    });

    await Excerise.bulkCreate(exceriseData, {
      ignoreDuplicates: true,
    });

    const muscles = exercises.flatMap(({ exerciseId, secondaryMuscles }) => {
      return secondaryMuscles.map((muscle) => {
        return {
          exerciseId,
          muscle,
        };
      });
    });

    await SecondaryMuscle.bulkCreate(muscles);

    const allinstructions = exercises.flatMap(
      ({ exerciseId, instructions }) => {
        return instructions.map((instruction) => {
          return { exerciseId, instruction };
        });
      }
    );
    await Instructions.bulkCreate(allinstructions);
    console.log("Data inserted successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/status", (req, res) => {
  res.status(200).send("<h1>Server is Running !!!!!</h1>");
});

//exercises
app.get("/exercises", (req, res) => {
  res.status(200).send(exercises);
});

//exercises:exerciseId
app.get("/exercises/exerciseId/:exerciseId", (req, res) => {
  const getId = exercises.filter((el) => {
    return el.exerciseId == req.params.exerciseId;
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
    .filter((el) => el.exerciseId == exerciseId)
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
