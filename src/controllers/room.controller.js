const { response } = require("../helpers/response");
const roomService = require("../services/room.service");

const getLocations = () => {
  return async (req, res, next) => {
    try {
      const rooms = await roomService.getRooms();

      res.status(200).json(response(rooms));
    } catch (error) {
      next(error);
    }
  };
};

const getRoomById = () => {
  return async (req, res, next) => {
    try {
      const { roomId } = req.params;

      const room = await roomService.getRoomById(roomId);

      res.status(200).json(response(room));
    } catch (error) {
      next(error);
    }
  };
};

const searchRoomsByLocationId = () => {
  return async (req, res, next) => {
    try {
      const { locationId } = req.params;

      const rooms = await roomService.searchRoomsByLocationId(locationId);

      res.status(200).json(response(rooms));
    } catch (error) {
      next(error);
    }
  };
};

const createRoom = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const room = await roomService.createRoom(data);

      res.status(201).json(response(room));
    } catch (error) {
      next(error);
    }
  };
};

const updateRoom = () => {
  return async (req, res, next) => {
    try {
      const { roomId } = req.params;
      const data = req.body;

      const room = await roomService.updateRoom(roomId, data);

      res.status(200).json(response(room));
    } catch (error) {
      next(error);
    }
  };
};

const deleteRoom = () => {
  return async (req, res, next) => {
    try {
      const { roomId } = req.params;

      await roomService.deleteRoom(roomId);
      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

const uploadImage = () => {
  return async (req, res, next) => {
    try {
      const file = req.file;
      const { roomId } = req.params;

      const room = await roomService.uploadImage(roomId, file);

      res.status(200).json(response(room));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getLocations,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
  searchRoomsByLocationId,
  uploadImage,
};
