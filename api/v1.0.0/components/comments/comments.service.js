const sequelize = require('sequelize');
const models = require('../../../../models');
const Op = models.Sequelize.Op;

/**
 * create a new comment
 */
insertComment = data => {
  return new Promise((resolve, reject) => {
    models.Comments.create({
      filmId: data.filmId,
      comment: data.comment,
      userIp: data.userIp
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * get all comments from the comments table
 */
fetchAllComments = () => {
  return new Promise((resolve, reject) => {
    models.Comments.findAll()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * get comments using a filmId
 */
fetchCommentByFilmId = id => {
  return new Promise((resolve, reject) => {
    models.Comments.findAll({
      where: { filmId: id }
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Get comments using filmId in reversed chronological order
 */
fetchCommentByFilmIdReversed = id => {
  return new Promise((resolve, reject) => {
    models.Comments.findAll({
      attributes: ['filmId', 'comment', 'userIp', 'createdAt'],
      where: { filmId: id },
      order: [['createdAt', 'DESC']]
    })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * count all comments in the database
 */
countAllComments = () => {
  return new Promise((resolve, reject) => {
    models.Comments.count()
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * count all comments for a particular film
 */
countAllCommentsOnFilm = id => {
  return new Promise((resolve, reject) => {
    models.Comments.count({ where: { filmId: { [Op.eq]: id } } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  insertComment,
  fetchAllComments,
  fetchCommentByFilmId,
  fetchCommentByFilmIdReversed,
  countAllComments,
  countAllCommentsOnFilm
};
