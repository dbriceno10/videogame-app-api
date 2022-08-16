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
  return await findOne({
    where: {
      name: name.trim().toLowerCase(),
    },
    include: Genre,
  });
};

const saveGenresDb = async () => {
  const genre = await getApiGenres();
  genre.forEach((e) => {
    Genre.findOrCreate({
      where: { name: e },
    });
  });
};

const getGenresDb = async (genre) => {
  return await Genre.findAll({ where: { name: genre } });
};

const createdNewGameDb = async (
  name,
  description,
  released,
  background_image,
  rating,
  platforms
) => {
  return await Videogame.create({
    name,
    description,
    released,
    background_image,
    rating: parseFloat(rating),
    platforms,
    createdInDb: true,
  });
};

const createGameDb = async (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  genre
) => {
  const newGame = await createdNewGameDb(
    name,
    description,
    released,
    background_image,
    rating,
    platforms
  );
  const genres = await getGenresDb(genre);
  await newGame.addGenre(genres);
};

module.exports = {
  saveGenresDb,
  getGenresDb,
  getDbGames,
  getDbGameById,
  getDbGameByName,
  createGameDb,
};
