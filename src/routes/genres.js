const { Router } = require("express");
const { getGenres } = require("../controllers/games.controller");

const router = Router();

router.get("/", getGenres);

module.exports = router;
