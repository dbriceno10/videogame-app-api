const { getGamesApi, getGameApiById } = require("../services/api.service");
const {
  getDbGames,
  createGameDb,
  getDbGameById,
  saveGenresDb,
} = require("../services/db.service.js");
const { fillterGameByName } = require("../utils/fillterGames");

const getAllGames = async () => {
  const apiGames = await getGamesApi();
  const dbGames = await getDbGames();
  const games = [...dbGames, ...apiGames];
  return games;
};

const getGames = async (req, res) => {
  const { name } = req.query;
  try {
    const games = await getAllGames();
    if (name) {
      if (name) {
        const gameName = fillterGameByName(games, name);
        gameName.length
          ? res.status(200).json(gameName)
          : res.status(404).send([]);
      }
    } else {
      res.status(200).json(games);
    }
  } catch (error) {
    console.error(error);
    res.status(404).send({
      message: "Ha ocurrido un error al obtener los videojuegos",
      error,
    });
  }
};

const createGame = async (req, res) => {
  const {
    name,
    description,
    released,
    background_image,
    platforms,
    genres,
    rating,
  } = req.body;
  try {
    createGameDb(
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      genres
    );
    res.status(201).send({ messaje: "El juego se ha creado con éxito" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ message: "Ha ocurrido un error al crear el juego", error });
  }
};

const getGenres = async (req, res) => {
  try {
    const genres = await saveGenresDb();
    res.status(200).json(genres);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ message: "Ha ocurrido un error al obtener los géneros" });
  }
};

const getGamesById = async (req, res) => {
  const { id } = req.params;
  try {
    const gameDb = await getDbGameById(id);
    res.status(200).json(gameDb);
  } catch {
    try {
      const gameApi = await getGameApiById(id);
      res.status(200).json(gameApi);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .send({ message: "Ha ocurrido un error al al buscar el juego" });
    }
  }
};

module.exports = {
  getGames,
  createGame,
  getGenres,
  getGamesById,
};
