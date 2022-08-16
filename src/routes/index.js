const { Router } = require("express");
const games = require("./games");
const genres = require("./genres");

const router = Router();

router.use("/games", games);
router.use("/genres", genres);

module.exports = router;
