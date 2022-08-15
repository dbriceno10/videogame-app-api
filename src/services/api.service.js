require("dotenv").config();
const axios = require("axios");
const { getInfoApiGameArray } = require("../utils/getInfoGameAPI");
const { BASE_URL, API_KEY } = process.env;

const getGamesApi = async () => {
  const promises = [
    axios(`${BASE_URL}/games?key=${API_KEY}`),
    axios(`${BASE_URL}/games?key=${API_KEY}&page=2`),
    axios(`${BASE_URL}/games?key=${API_KEY}&page=3`),
    axios(`${BASE_URL}/games?key=${API_KEY}&page=4`),
    axios(`${BASE_URL}/games?key=${API_KEY}&page=5`),
  ];

  const response = await Promise.all(promises);
  const gamesAPI = response.map((e) => e.data.results);
  const games = getInfoApiGameArray(gamesAPI);

  return games;
};

const getGameApiById = async (id) => {
  return await axios.get(`${BASE_URL}/games/${id}?key=${API_KEY}`);
};

const getApiGenres = async () => {
  const response = await axios(`${BASE_URL}/genres?key=${API_KEY}`);
  const genres = response.data.results.map((e) => e.name);
  return genres;
};

/* const recursiveRequest = async (url, array = []) => {
  let data = await axios.get(url);
  array.push(data);
  console.log(data.data.next)
  if (data.data.next) {
    recursiveRequest(data.data.next);
  }
};

const getGameAPIByName = async (search) => {
  const datas = [];
  recursiveRequest(
    `${BASE_URL}?key=${API_KEY}&search=${search}`,
    datas
  );
  console.log(datas)
}; */

module.exports = {
  getGamesApi,
  getGameApiById,
  getApiGenres,
};
