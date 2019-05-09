'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      filmId: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      userIp: DataTypes.STRING
    },
    {}
  );

  return Comments;
};
