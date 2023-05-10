const { AppError } = require("../helpers/error");
const { Room, User, Location } = require("../models");
const configs = require("../config");

const getRooms = async () => {
  try {
    const rooms = await Room.findAll({
      include: ["owner", "location"],
    });
    return rooms;
  } catch (error) {
    throw error;
  }
};

const getRoomById = async (roomId) => {
  try {
    const room = await Room.findOne({
      where: { roomId },
      include: ["owner", "location"],
    });
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    return room;
  } catch (error) {
    throw error;
  }
};

// search room by location
const searchRoomsByLocationId = async (locationId) => {
  try {
    const location = await Location.findByPk(locationId);
    if (!location) {
      throw new AppError(404, "Location not found");
    }

    const rooms = await Room.findAll({
      where: { locationId },
    });

    return rooms;
  } catch (error) {
    throw error;
  }
};

const createRoom = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const location = await Location.findByPk(data.locationId);
    if (!location) {
      throw new AppError(404, "Location not found");
    }

    const room = await Room.create(data);
    return room;
  } catch (error) {
    throw error;
  }
};

const updateRoom = async (roomId, data) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    await Room.update(data, { where: { roomId } });

    const roomAfter = await Room.findByPk(roomId);

    return roomAfter;
  } catch (error) {
    throw error;
  }
};

const deleteRoom = async (roomId) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    await Room.destroy({ where: { roomId } });
  } catch (error) {
    throw error;
  }
};

const uploadImage = async (roomId, file) => {
  try {
    if (!file) {
      throw new AppError(404, "Please upload a file");
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    const url = `${configs.URL}/${file.path}`;

    await Room.update({ ...room, hinhAnh: url }, { where: { roomId } });

    const roomAfter = await Room.findByPk(roomId);
    return roomAfter;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRoomsByLocationId,
  uploadImage,
};
