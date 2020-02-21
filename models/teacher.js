'use strict';
module.exports = (sequelize, DataTypes) => {
  class Teacher extends sequelize.Sequelize.Model {}
  Teacher.init({
    // Model attributes are defined here
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING
      // allowNull defaults to true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Teacher' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Teacher === sequelize.models.Teacher); // true
  return Teacher
};