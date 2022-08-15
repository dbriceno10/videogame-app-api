const { Router } = require("express");
const { getGames, createGame } = require("../controllers/get.games.controller");

const router = Router();

router.get("/", getGames);
router.post("/create", createGame);

module.exports = router;
