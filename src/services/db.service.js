require("dotenv").config();
const { Genre, Videogame } = require("../db");
const { getApiGenres } = require("./api.service");
const { getGenres } = require("../utils/getGenres");

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
  const gamesDb = games.map((e) => {
    return { ...e.dataValues, genres: getGenres(e.dataValues) };
  });
  return gamesDb;
};

const getIds = async (arrayGenres) => {
  let genresId = [];
  for (let i = 0; i < arrayGenres.length; i++) {
    genresId.push(
      await Genre.findOne({
        where: { name: arrayGenres[i] },
        attributes: ["id"],
      })
    );
  }
  return genresId;
};

const getDbGameById = async (id) => {
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
  return { ...game.dataValues, genres: getGenres(game.dataValues) };
};

/* const getDbGameByName = async (name) => {
  return await findOne({
    where: {
      name: name.trim().toLowerCase(),
    },
    include: Genre,
  });
}; */

const getGenresDb = async () => {
  return await Genre.findAll();
};
const saveGenresDb = async () => {
  const genre = await getApiGenres();
  genre.forEach((e) => {
    Genre.findOrCreate({
      where: { name: e },
    });
  });
  return await getGenresDb();
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
  });
};

const createGameDb = async (
  name,
  description,
  released,
  background_image,
  rating,
  platforms,
  genres
) => {
  const newGame = await createdNewGameDb(
    name,
    description,
    released,
    background_image,
    rating,
    platforms
  );
  const genresId = await getIds(genres);
  await newGame.setGenres(genresId);
};

module.exports = {
  saveGenresDb,
  getDbGames,
  getDbGameById,
  createGameDb,
};
