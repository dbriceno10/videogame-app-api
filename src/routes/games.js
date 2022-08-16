const { Router } = require("express");
const {
  getGames,
  createGame,
  getGamesById,
} = require("../controllers/games.controller");

const router = Router();

router.get("/", getGames);
router.post("/create", createGame);
router.get("/:id", getGamesById);

module.exports = router;
