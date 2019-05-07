const models = require('../../../../models');
const Op = models.Sequelize.Op;

/**
 * create a new comment
 */
insertComment = async data => {
  try {
    return await models.Comments.create({
      filmId: filmId,
      description: data.description
    });
  } catch (err) {
    return err;
  }
};

/**
 * get all comments from the comments table
 */
fetchAllComments = async () => {
  try {
    await models.Comments.findAll();
  } catch (err) {
    return err;
  }
};

/**
 * get comments using a filmId
 */
fetchCommentByFilmId = async id => {
  try {
    await models.Comments.findOne({
      where: { filmId: id }
    });
  } catch (err) {
    return err;
  }
};

/**
 * Get comments using filmId in reversed chronological order
 */
fetchCommentByFilmIdReversed = async id => {
  try {
    await models.Comments.findOne({
      where: { filmId: id },
      order: ['createAt', 'DESC']
    });
  } catch (err) {
    return err;
  }
};

/**
 * count all comments in the database
 */
countAllComments = async () => {
  try {
    return await models.Comments.count();
  } catch (err) {
    return err;
  }
};

/**
 * count all comments for a particular film
 */
countAllCommentsOnFilm = async id => {
  return new Promise((resolve, reject) => {
    models.Comments.count({ where: { filmId: { [Op.eq]: id } } })
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });

  /*try {
    return await models.Comments.count({ where: { id: { [Op.eq]: id } } });
  } catch (err) {
    return err;
  }*/
};

module.exports = {
  insertComment,
  fetchAllComments,
  fetchCommentByFilmId,
  fetchCommentByFilmIdReversed,
  countAllComments,
  countAllCommentsOnFilm
};
