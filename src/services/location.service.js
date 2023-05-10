const { AppError } = require("../helpers/error");
const { Location } = require("../models");
const { Op } = require("sequelize");
const configs = require("../config");

const getLocations = async () => {
  try {
    const locations = await Location.findAll();

    return locations;
  } catch (error) {
    throw error;
  }
};

const getLocationById = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId);
    if (!location) {
      throw new AppError(404, "Location not found");
    }

    return location;
  } catch (error) {
    throw error;
  }
};

const createLocation = async (data) => {
  try {
    const location = await Location.create(data);
    return location;
  } catch (error) {
    throw error;
  }
};

const updateLocation = async (locationId, data) => {
  try {
    const location = await Location.findByPk(locationId);
    if (!location) {
      throw new AppError(404, "Location not found");
    }

    await Location.update(data, {
      where: {
        locationId,
      },
    });

    const locationAfter = await Location.findByPk(locationId);

    return locationAfter;
  } catch (error) {
    throw error;
  }
};

const deleteLocation = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId);
    if (!location) {
      throw new AppError(404, "Location not found");
    }

    await Location.destroy({ where: { locationId } });
  } catch (error) {
    throw error;
  }
};

const searchLocation = async (searchTerm) => {
  const locations = await Location.findAll({
    where: {
      quocGia: { [Op.like]: "%" + searchTerm + "%" },
    },
  });

  return locations;
};

const uploadImage = async (locationId, file) => {
  if (!file) {
    throw new AppError(400, "Please upload file");
  }

  const location = await Location.findByPk(locationId);
  if (!location) {
    throw new AppError(404, "Location not found");
  }

  const url = `${configs.URL}/${file.path}`;

  await Location.update(
    { ...location, hinhAnh: url },
    {
      where: { locationId },
    }
  );

  const locationAfter = await Location.findByPk(locationId);

  return locationAfter;
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
