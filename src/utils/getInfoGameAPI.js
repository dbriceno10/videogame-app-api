const getInfoApiGame = (game) => {
  return {
    id: game.id,
    name: game.name,
    rating: game.rating,
    background_image: game.background_image,
    genres: game.genres.map((ele) => {
      return { name: ele.name };
    }),
    platforms: game.platforms.map((ele) => {
      return { name: ele.platform.name };
    }),
  };
};
