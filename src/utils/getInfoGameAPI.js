const getInfoApiGame = (game) => {
  return {
    id: game.id,
    name: game.name,
    rating: game.rating,
    background_image: game.background_image,
    genres: game.genres.map((e) => {
      return { name: e.name };
    }),
    platforms: game.platforms.map((e) => {
      return { name: e.platform.name };
    }),
    createdInDb: false,
  };
};

const getInfoApiGameArray = (array = []) => {
  return array.flat().map((e) => getInfoApiGame(e));
};

module.exports = {
  getInfoApiGame,
  getInfoApiGameArray
};
