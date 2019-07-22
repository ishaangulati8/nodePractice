'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.beforeCreate(async (user, option) => {
    try {
      if (user.password) {
        hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
      }
    } catch (error) {
      throw new Error(error);
    }
  });
  User.beforeUpdate(async (user, option) => {
    try {
      if (user.password) {
        hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
      }
    } catch (error) {
      throw new Error(error);
    }
  })
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
