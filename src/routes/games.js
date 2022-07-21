const { Router } = require("express");
const { getGames } = require("../controllers/get.games.controller");

const router = Router();

router.get("/", getGames);

module.exports = router;