const express = require("express");
const logger = require("morgan");
const mongojs = require('mongojs')
const mongoose = require("mongoose");
const path = require('path')
const compression = require("compression");


const PORT = process.env.PORT || 3000;

const Workout = require("./models/model");
const app = express();
app.use(logger("dev"));


app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

mongoose.connect(
  process.env.MONGODB_URI ||"mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
// routes
// app.use(require(".apis"));

//HTML routes to target


app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get("/exercise", (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'exercise.html'));
})

app.get('/stats', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'stats.html'))
})

// API routes to target
  

app.get("/api/workouts", (_, res) => {
  Workout.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", (_, res) => {
  Workout.create({})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.put("/api/workouts/:id", ({body, params}, res) => {
  Workout.findByIdAndUpdate(params.id, 
    {$push:{exercises:body}}, 
    {new:true, runValidators: true})
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
}); 


app.get('/api/workouts/range', (_, res) => {
  Workout.find()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});