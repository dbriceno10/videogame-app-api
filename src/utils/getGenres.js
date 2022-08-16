const getGenres = (game) => {
  const genres = game.genres.map((e) => e.dataValues.name);
  return genres;
};

module.exports = {
  getGenres,
};
