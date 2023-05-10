const { AppError } = require("../helpers/error");
const { Comment, User, Room } = require("../models");

const getComments = async () => {
  try {
    const comments = await Comment.findAll();

    return comments;
  } catch (error) {
    throw error;
  }
};

const getCommentById = async (commentId) => {
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new AppError(404, "Comment not found");
    }

    return comment;
  } catch (error) {
    throw error;
  }
};

const getCommentByUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const comments = await User.findOne({
      where: { userId },
      include: "commentedRoom",
    });

    return comments;
  } catch (error) {
    throw error;
  }
};

const getCommentByRoom = async (roomId) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    const comments = await Room.findOne({
      where: { roomId },
      include: "userCommented",
    });

    return comments;
  } catch (error) {
    throw error;
  }
};

const createComment = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const room = await Room.findByPk(data.roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }
    console.log(0 < data.saoBinhLuan && data.saoBinhLuan < 6);
    if (!(0 < data.saoBinhLuan && data.saoBinhLuan < 6)) {
      throw new AppError(400, "saoBinhLuan from 1 to 5 ");
    }

    const comment = await Comment.create(data);

    return comment;
  } catch (error) {
    throw error;
  }
};

const updateComment = async (commentId, data) => {
  const comment = await Comment.findByPk(commentId);
  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  const user = await User.findByPk(data.userId);
  if (!user) {
    throw new AppError(404, "User not found");
  }

  const room = await Room.findByPk(data.roomId);
  if (!room) {
    throw new AppError(404, "Room not found");
  }

  await Comment.update(data, { where: { commentId } });

  const commentAfter = await Comment.findByPk(commentId);
  return commentAfter;
};

const deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      throw new AppError(404, "Comment not found");
    }

    await Comment.destroy({ where: { commentId } });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getComments,
  getCommentById,
  getCommentByUser,
  getCommentByRoom,
  createComment,
  deleteComment,
  updateComment,
};
