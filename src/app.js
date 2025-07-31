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
const defineImages = require("./models/imageModel");

const Excerise = defineExcerise(sequelize);
const SecondaryMuscle = defineSecondaryMuscle(sequelize);
const Instructions = defineInstructions(sequelize);
const Images = defineImages(sequelize);

// Associations
Excerise.hasMany(SecondaryMuscle, {
  foreignKey: "exerciseId",
  sourceKey: "exerciseId",
});
Excerise.hasMany(Instructions, {
  foreignKey: "exerciseId",
  sourceKey: "exerciseId",
});
Excerise.hasMany(Images, {
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
Images.belongsTo(Excerise, {
  foreignKey: "exerciseId",
  targetKey: "exerciseId",
});

module.exports = {
  sequelize,
  Excerise,
  SecondaryMuscle,
  Instructions,
};

// console.log(images.ImageService());
(async () => {
  try {
    await sequelize.sync();

    // const exceriseData = exercises.map((el) => {
    //   const {
    //     bodyPart,
    //     equipment,
    //     exerciseId,
    //     name,
    //     target,
    //     description,
    //     difficulty,
    //     category,
    //   } = el;
    //   return {
    //     bodyPart,
    //     equipment,
    //     exerciseId,
    //     name,
    //     target,
    //     description,
    //     difficulty,
    //     category,
    //   };
    // });

    // await Excerise.bulkCreate(exceriseData, {
    //   ignoreDuplicates: true,
    // });

    // const muscles = exercises.flatMap(({ exerciseId, secondaryMuscles }) => {
    //   return secondaryMuscles.map((muscle) => {

    //     return {
    //       exerciseId,
    //       muscle,
    //     };
    //   });
    // });

    // await SecondaryMuscle.bulkCreate(muscles, {
    //   ignoreDuplicates: true, // skip duplicates
    // });

    // const allinstructions = exercises.flatMap(
    //   ({ exerciseId, instructions }) => {
    //     return instructions.map((instruction) => {
    //       return { exerciseId, instruction };
    //     });
    //   }
    // );

    // await Instructions.bulkCreate(allinstructions, {
    //   ignoreDuplicates: true,
    // });

    // await Images.bulkCreate(images.ImageService(), {
    //   ignoreDuplicates: true,
    // });

    console.log("connect to the database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

app.get("/status", (req, res) => {
  res.status(200).send("<h1>Server is Running !!!!!</h1>");
});

//exercises
app.get("/exercises", async (req, res) => {
  const allExcerise = await Excerise.findAll({
    include: [SecondaryMuscle, Instructions],
  });

  res.status(200).send(allExcerise);
});

//exercises:exerciseId
app.get("/exercises/exerciseId/:exerciseId", async (req, res) => {
  const getId = await Excerise.findAll({
    where: { exerciseId: req.params.exerciseId },
  });
  if (getId.length) {
    res.status(200).send(getId);
  } else {
    res.status(404).send("Not Found Id");
  }
});

//exercises/target/:target
app.get("/exercises/target/:target", async (req, res) => {
  const getTarget = await Excerise.findAll({
    where: { target: req.params.target },
  });

  if (getTarget.length) {
    res.status(200).send(getTarget);
  } else {
    res.status(404).send("Not Found Target");
  }
});

//exercises/equipment/:equipment
app.get("/exercises/equipment/:equipment", async (req, res) => {
  const getequipment = await Excerise.findAll({
    where: { equipment: req.params.equipment },
  });

  if (getequipment.length) {
    res.status(200).send(getequipment);
  } else {
    res.status(404).send("Not Found equipment");
  }
});

//bodypartlist
app.get("/exercises/bodyPartList", async (req, res) => {
  const getAllBodyPartList = await Excerise.findAll();
  const bodyPartList = [
    ...new Set(getAllBodyPartList.map(({ bodyPart }) => bodyPart)),
  ];
  res.status(200).send(bodyPartList);
});

//exercises/bodyPart/:bodyPart
app.get("/exercises/bodyPart/:bodypart", async (req, res) => {
  const getBodyPart = await Excerise.findAll({
    where: { bodypart: req.params.bodypart },
  });
  if (getBodyPart.length) {
    res.status(200).send(getBodyPart);
  } else {
    res.status(404).send("Not Found");
  }
});

//image/:exerciseId
app.get("/image", async (req, res) => {
  const { exerciseId } = req.query;
  const findImageId = await Images.findAll({
    where: { exerciseId: exerciseId },
  });

  res.sendFile(findImageId);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
