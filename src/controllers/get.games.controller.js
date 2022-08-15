const { default: axios } = require("axios");
const { getGamesApi } = require("../services/api.service.js");

const getGames = async (req, res) => {
  try {
    const apiGames = await getGamesApi();
    res.status(200).json(apiGames);

  } catch (error) {
    console.error(error);
    res
      .status(404)
      .send({
        status: 404,
        message: "Ha ocurrido un error al obtener los videojuegos",
        error
      });
  }
};

module.exports = {
  getGames
}