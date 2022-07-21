const { axiosIntance } = require("../utils/axiosInstance");
require("dotenv").config;

const getGamesAPI = async () => {
  const games = await axiosIntance.get("&page_size=40");
};

module.exports = {
  getGamesAPI
}
