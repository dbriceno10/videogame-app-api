require("dotenv").config();
const axios = require("axios");
const { BASE_URL, API_KEY } = process.env;

const getGamesAPI = async () => {
  const games = await axios.get(`${BASE_URL}?key=${API_KEY}&page_size=40`)
  return games;
};

const getGameAPIByName = async() => {
  
}

module.exports = {
  getGamesAPI,
};
