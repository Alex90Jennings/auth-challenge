const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const jwtSecret = "mysecret";

const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();

  console.log(movies);

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  console.log(req.body);

  try {
    const token = req.header("authorization");
    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: "Invalid token provided." });
  }

  try {
    const createdMovie = await prisma.movie.create({
      data: {
        title,
        description,
        runtimeMins,
      },
    });
  } catch (e) {
    return res.status(401).json({ error: e.toString() });
  }

  console.log(createdMovie);

  res.json({ data: createdMovie });
};

module.exports = {
  getAllMovies,
  createMovie,
};
