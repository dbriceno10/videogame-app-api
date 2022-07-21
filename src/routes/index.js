const { Router } = require('express');
const games = require('./games')

const router = Router();

router.use('/games', games)


module.exports = router;
