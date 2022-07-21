require("dotenv").config();
const axios = require("axios");

const { BASE_URL, API_KEY } = process.env;

const axiosIntance = axios.create({
  baseURL: `${BASE_URL}?key=${API_KEY}`,
  timeout: 30000,
});

module.exports = {
  axiosIntance,
};
