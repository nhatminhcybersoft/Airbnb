const { AppError } = require("../helpers/error");
const { User } = require("../models");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");

const login = async (credentials) => {
  try {
    const { email, password } = credentials;

    const user = await User.findOne({
      where: {
        email,
      },
      attributes: { include: ["password"] },
    });

    if (!user) {
      throw new AppError(400, "Email or password invalid");
    }

    const isMatched = bcrypt.compareSync(password, user.password);
    if (!isMatched) {
      throw new AppError(400, "Email or password invalid");
    }

    return generateToken(user);
  } catch (error) {
    throw error;
  }
};

const register = async (data) => {
  const user = await User.findOne({
    where: {
      email: data.email,
    },
  });

  if (user) {
    throw new AppError(400, "Email is existed");
  }
  
  if (data.role && data.role !== "USER" && data.role !== "ADMIN") {
    throw new AppError(400, "Role is USER or ADMIN");
  }

  const registerUser = await User.create(data);

  return registerUser;
};



module.exports = {
  login,
  register,
};
