const { AppError } = require("../helpers/error");
const { User } = require("../models");
const { Op } = require("sequelize");
const configs = require("../config");

const getUsers = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findOne({ where: { userId } });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (data) => {
  try {
    const user = await User.findOne({
      where: {
        email: data.email,
      },
    });

    if (user) {
      throw new AppError(400, "Email is existed");
    }

    if (data.role && data.role !== "ADMIN" && data.role !== "USER") {
      throw new AppError(400, "Role is USER or ADMIN");
    }

    const createdUser = await User.create(data);

    return createdUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, data) => {
  try {
    const user = await User.findOne({
      where: {
        userId,
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    await User.update(data, {
      where: {
        userId,
      },
    });

    const userN = await User.findOne({
      where: {
        userId,
      },
    });

    return userN;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new AppError(404, "User not found");
    }

    await User.destroy({ where: { userId } });
  } catch (error) {
    throw error;
  }
};

const searchUser = async (searchTerm) => {
  const users = await User.findAll({
    where: {
      name: { [Op.like]: "%" + searchTerm + "%" },
    },
  });

  return users;
};

const uploadAvatar = async (userId, file) => {
  try {
    if (!file) {
      throw new AppError(400, "Please upload file");
    }

    const url = `${configs.URL}/${file.path}`;

    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    await User.update({ ...user, avatar: url }, { where: { userId } });

    const userAfter = await User.findOne({ where: { userId } });
    return userAfter;
  } catch (error) {
    throw error;
  }
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
