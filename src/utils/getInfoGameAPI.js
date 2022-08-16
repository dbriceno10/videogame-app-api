const getInfoApiGame = (game) => {
  return {
    id: game.id,
    name: game.name,
    description: game.description,
    rating: game.rating,
    background_image: game.background_image,
    genres: game.genres.map((e) => {
      return e.name;
    }),
    platforms: game.platforms.map((e) => {
      return e.platform.name;
    }),
    released: game.released,
    createdInDb: false,
  };
};

const getInfoApiGameArray = (array = []) => {
  return array.flat().map((e) => getInfoApiGame(e));
};

module.exports = {
  getInfoApiGame,
  getInfoApiGameArray,
};
