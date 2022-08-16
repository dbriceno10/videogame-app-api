const { getGamesApi } = require("../services/api.service");
const { getDbGames, createGameDb } = require("../services/db.service.js");
const { fillterGameByName } = require("../utils/fillterGames");

const getAllGames = async () => {
  const apiGames = await getGamesApi();
  const dbGames = await getDbGames();
  const games = [...dbGames, apiGames];
  return games;
};

const getGames = async (req, res) => {
  const { name } = req.body;
  try {
    const games = await getAllGames();
    if (name) {
      if (name) {
        const gameName = fillterGameByName(games, name);
        gameName.length
          ? res.status.json(gameName)
          : res.status(404).send({ message: "El juego no se ha encontrado" });
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
  //TODO: Revisar por qué no se están guardando los géneros
  const {
    name,
    description,
    released,
    background_image,
    platforms,
    genre,
    createdInDb,
  } = req.body;
  const rating = parseFloat(req.body.rating);

  try {
    createGameDb(
      name,
      description,
      released,
      background_image,
      rating,
      platforms,
      createdInDb,
      genre
    );
    res.status(201).send({ messaje: "El juego se ha creado con éxito" });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send({ message: "Ha ocurrido un error al crear el juego", error });
  }
};

module.exports = {
  getGames,
  createGame,
};
