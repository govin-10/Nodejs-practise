module.exports = (sequelize, DataTypes) => {
  const toDo_model = sequelize.define("to-do-model", {
    activity: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return toDo_model;
};
