module.exports = (sequelize, DataTypes) => {
  class Subject extends sequelize.Sequelize.Model {}
  Subject.init({
    // Model attributes are defined here
    subject_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Subject' // We need to choose the model name
  });

  // the defined model is the class itself
  console.log(Subject === sequelize.models.Subject); // true
  return Subject
};