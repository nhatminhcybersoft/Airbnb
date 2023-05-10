const { response } = require("../helpers/response");
const userService = require("../services/user.service");

const getUsers = () => {
  return async (req, res, next) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const getUserById = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(userId);

      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const createUser = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const user = await userService.createUser(data);

      res.status(201).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};

const updateUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const data = req.body;

      const updatedUser = await userService.updateUser(userId, data);

      res.status(200).json(response(updatedUser));
    } catch (error) {
      next(error);
    }
  };
};

const deleteUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;

      await userService.deleteUser(userId);

      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const searchUser = () => {
  return async (req, res, next) => {
    try {
      const { name } = req.params;

      const users = await userService.searchUser(name);

      res.status(200).json(response(users));
    } catch (error) {
      next(error);
    }
  };
};

const uploadAvatar = () => {
  return async (req, res, next) => {
    const { userId } = req.params;
    const file = req.file;

    const user = await userService.uploadAvatar(userId, file);

    res.status(200).json(response(user));
  };
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUser,
  uploadAvatar,
};
