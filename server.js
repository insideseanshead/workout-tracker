const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", { useNewUrlParser: true });

db.Workout.create({ name: "Test Case" })
  .then(dbworkout => {
    console.log(dbworkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

  app.get("/workout", (req, res) => {
    db.Workout.find({})
      .then(dbworkout => {
        res.json(dbworkout);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
  app.get("/exercise", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });

  

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });