require("dotenv").config();
const { Genre, Videogame } = require("../db");
const { getApiGenres } = require("./api.service");

const getDbGames = async () => {
  const games = await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return games;
};

const getDbGameById = async () => {
  const game = await Videogame.findByPk(id, {
    include: [
      {
        model: Genre,
        through: {
          attributes: [],
        },
      },
    ],
  });
  return game;
};

const getDbGameByName = async (name) => {
  const game = await findOne({
    where: {
      name: name.trim().toLowerCase(),
    },
    include: Genre,
  });
  return game;
};

const saveGenresDb = async () => {
  const genre = await getApiGenres();
  genre.forEach((e) => {
    Genre.findOrCreate({
      where: { name: e },
    });
  });
};

const getGenresDb = async () => {
  return await Genre.findAll();
};

const createGameDb = (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  genre
) =>
  Videogame.create({
    name,
    description,
    released,
    background_image,
    rating,
    platforms,
    createdInDb: true,
  });

module.exports = {
  saveGenresDb,
  getGenresDb,
  createGameDb,
  getDbGames,
  getDbGameById,
  getDbGameByName,
};
