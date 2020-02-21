'use strict';

module.exports = (sequelize, DataTypes) => {

    class Student extends sequelize.Sequelize.Model{}

	Student.init({
		first_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_name: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		birthdate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		sequelize,
		modelName: 'Student'
	});

	console.log(Student === sequelize.models.Student); // true

    return Student;
};