const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const movies = [
  { id: 1, name: "Fury" },
  { id: 2, name: "FightClub" },
  { id: 3, name: "TheShining" },
  { id: 4, name: "DoctorSleep" },
];

app.get("/", (req, res) => {
  //Call Back function inside main function
  res.send("Hello World");
});

app.get("/api/movies", (req, res) => {
  //Call Back function inside main function
  res.send(movies);
});

// /api/movies/1
app.get("/api/movies/:id", (req, res) => {
  //Call Back function inside main function
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with given id wasn't found"); //In case we don't have the movie id
  res.send(movie); //In case we have the movie id
});

app.post("/api/movies", (req, res) => {
  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };

  //   const result = Joi.validate(req.body, schema);
  //   //   console.log(result);

  //   //   if (!req.body.name || req.body.length < 3) {
  //   if (result.error) {
  //     //400 Bad status
  //     res.status(400).send(result.error);
  //     return;
  //   }
  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
});

app.put("/api/movies/:id", (req, res) => {
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with given id wasn't found");

  const { error } = validateMovie(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }

  movie.name = req.body.name;
  res.send(movie);
});

function validateMovie(movie) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(movie, schema);
}

app.delete("/api/movies/:id", (req, res) => {
  //Look up the course
  //Not exist, return 404
  const movie = movies.find((c) => c.id === parseInt(req.params.id));
  if (!movie) res.status(404).send("The movie with given id wasn't found");

  //Delete
  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  //Return Same Course
  res.send(movie);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
