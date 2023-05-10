const { response } = require("../helpers/response");
const authService = require("../services/auth.service");

const login = () => {
  return async (req, res, next) => {
    try {
      const credentials = req.body;

      const token = await authService.login(credentials);

      res.status(200).json(response(token));
    } catch (error) {
      next(error);
    }
  };
};

const register = () => {
  return async (req, res, next) => {
    try {
      try {
        const data = req.body;

        const registered = await authService.register(data);

        res.status(200).json(response(registered));
      } catch (error) {
        next(error);
      }
    } catch (error) {
      next(error);
    }
  };
};

const getProfile = () => {
  return async (req, res, next) => {
    try {
      const {user} = res.locals;
      
      res.status(200).json(response(user));
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  login,
  register,
  getProfile,
};
