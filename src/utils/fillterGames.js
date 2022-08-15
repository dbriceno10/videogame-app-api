const fillterGameByName = (array, name) => {
  const gameName = array
    .filter((e) =>
      e.name.trim().toLowerCase().includes(name.trim().toLowerCase())
    )
    .slice(0, 15);
  return gameName;
};

module.exports = {
  fillterGameByName,
};
