const { response } = require("../helpers/response");
const locationService = require("../services/location.service");

const getLocations = () => {
  return async (req, res, next) => {
    try {
      const locations = await locationService.getLocations();

      res.status(200).json(response(locations));
    } catch (error) {
      next(error);
    }
  };
};

const getLocationById = () => {
  return async (req, res, next) => {
    try {
      const { locationId } = req.params;

      const location = await locationService.getLocationById(locationId);

      res.status(200).json(response(location));
    } catch (error) {
      next(error);
    }
  };
};

const createLocation = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      const location = await locationService.createLocation(data);

      res.status(201).json(response(location));
    } catch (error) {
      next(error);
    }
  };
};

const updateLocation = () => {
  return async (req, res, next) => {
    try {
      const { locationId } = req.params;
      const data = req.body;

      const location = await locationService.updateLocation(locationId, data);

      res.status(200).json(response(location));
    } catch (error) {
      next(error);
    }
  };
};

const deleteLocation = () => {
  return async (req, res, next) => {
    try {
      const { locationId } = req.params;

      await locationService.deleteLocation(locationId);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const searchLocation = () => {
  return async (req, res, next) => {
    try {
      const { quocGia } = req.params;

      const locations = await locationService.searchLocation(quocGia);

      res.status(200).json(response(locations));
    } catch (error) {
      next(error);
    }
  };
};

const uploadImage = () => {
  return async (req, res, next) => {
    try {
      const file = req.file;
      const { locationId } = req.params;

      const location = await locationService.uploadImage(locationId, file);
      res.status(200).json(response(location));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  searchLocation,
  uploadImage,
};
