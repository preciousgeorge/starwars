const models = require('../../../../models');
const Op = models.Sequelize.Op;

/**
 * create a new comment
 */
insertComment = async data => {
  await models.Comments.create({
    filmId: filmId,
    description: data.description
  })
    .then(comment => comment.id)
    .catch(err => console.log(err));
  return;
};

/**
 * get all comments from the comments table
 */
fetchAllComments = async () => {
  await models.Comments.findAll()
    .then(result => result)
    .catch(err => console.log(err));
  return;
};

/**
 * get comments using a filmId
 */
fetchCommentByFilmId = async id => {
  await models.Comments.findOne({
    where: { filmId: id }
  })
    .then(result => result)
    .catch(err => console.log(err));
  return;
};

/**
 * Get comments using filmId in reversed chronological order
 */
fetchCommentByFilmIdReversed = async id => {
  await models.Comments.findOne({
    where: { filmId: id },
    order: ['createAt', 'DESC']
  })
    .then(result => result)
    .catch(err => console.log(err));
  return;
};

/**
 * count all comments in the database
 */
countAllComments = async () => {
  await models.Comments.count()
    .then(result => result)
    .catch(err => console.log(err));
};

/**
 * count all comments for a particular film
 */
countAllCommentsOnFilm = async id => {
  await models.Comments.count()
    .then(result => result)
    .catch(err => console.log(err));
};
