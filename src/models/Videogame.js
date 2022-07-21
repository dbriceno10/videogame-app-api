const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      released: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      background_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        allowNull: false,
      },
      createdInDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: true,
    }
  );
};
