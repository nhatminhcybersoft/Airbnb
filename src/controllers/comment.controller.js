const { response } = require("../helpers/response");
const commentService = require("../services/comment.service");

const getComments = () => {
  return async (req, res, next) => {
    try {
      const comments = await commentService.getComments();

      res.status(200).json(response(comments));
    } catch (error) {
      next(error);
    }
  };
};

const getCommentById = () => {
  return async (req, res, next) => {
    try {
      const { commentId } = req.params;

      const comment = await commentService.getCommentById(commentId);

      res.status(200).json(response(comment));
    } catch (error) {
      next(error);
    }
  };
};

const getCommentByUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      const comments = await commentService.getCommentByUser(userId);

      res.status(200).json(response(comments));
    } catch (error) {
      next(error);
    }
  };
};

const getCommentByRoom = () => {
  return async (req, res, next) => {
    try {
      const { roomId } = req.params;

      const comments = await commentService.getCommentByRoom(roomId);

      res.status(200).json(response(comments));
    } catch (error) {
      next(error);
    }
  };
};
const createComment = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const comment = await commentService.createComment(data);

      res.status(200).json(response(comment));
    } catch (error) {
      next(error);
    }
  };
};

const updateComment = () => {
  return async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const data = req.body;

      const comment = await commentService.updateComment(commentId, data);

      res.status(200).json(response(comment));
    } catch (error) {
      next(error);
    }
  };
};

const deleteComment = () => {
  return async (req, res, next) => {
    try {
      const { commentId } = req.params;

      await commentService.deleteComment(commentId);

      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getComments,
  getCommentById,
  getCommentByUser,
  getCommentByRoom,
  createComment,
  updateComment,
  deleteComment,
};
