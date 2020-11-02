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

// db.Workout.create({ name: "Test Case" })
//   .then(dbworkout => {
//     console.log(dbworkout);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

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

  app.post("/workout", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbworkout => {
      res.json(dbworkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
  })

  // app.post("/submit", ({ body }, res) => {
  //   db.Note.create(body)
  //     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
  //     .then(dbUser => {
  //       res.json(dbUser);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     });
  // });

  app.post("/exercise", ({ body }, res) => {
    db.Exercise.create(body)
    .then(({ _id }) => db.Workout.findOneAndUpdate({}, { $push: { exercise: _id } }, { new: true }))
    .then(dbexercise => {
      res.json(dbexercise);
    })
    .catch(err => {
      res.json(err);
    });
  })

// Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });