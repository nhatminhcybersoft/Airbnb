const { response } = require("../helpers/response");
const bookingService = require("../services/bookingRoom.service");

const getBookings = () => {
  return async (req, res, next) => {
    try {
      const bookings = await bookingService.getBookings();

      res.status(200).json(response(bookings));
    } catch (error) {
      next(error);
    }
  };
};

const getBookingById = () => {
  return async (req, res, next) => {
    try {
      const { bookingId } = req.params;

      const booking = await bookingService.getBookingById(bookingId);

      res.status(200).json(response(booking));
    } catch (error) {
      next(error);
    }
  };
};

const getBookingByUser = () => {
  return async (req, res, next) => {
    try {
      const { userId } = req.params;
      const booking = await bookingService.getBookingByUser(userId);

      res.status(200).json(response(booking));
    } catch (error) {
      next(error);
    }
  };
};

const getBookingByRoom = () => {
  return async (req, res, next) => {
    try {
      const { roomId } = req.params;

      const booking = await bookingService.getBookingByRoom(roomId);

      res.status(200).json(response(booking));
    } catch (error) {
      next(error);
    }
  };
};

const createBooking = () => {
  return async (req, res, next) => {
    try {
      const data = req.body;

      const booking = await bookingService.createBooking(data);

      res.status(201).json(response(booking));
    } catch (error) {
      next(error);
    }
  };
};

const updateBooking = () => {
  return async (req, res, next) => {
    try {
      const { bookingId } = req.params;
      const data = req.body;

      const booking = await bookingService.updateBooking(bookingId, data);

      res.status(200).json(response(booking));
    } catch (error) {
      next(error);
    }
  };
};

const deleteBooking = () => {
  return async (req, res, next) => {
    try {
      const { bookingId } = req.params;

      await bookingService.deleteBooking(bookingId);

      res.status(200).json(response(true));
    } catch (error) {
      next(error);
    }
  };
};

module.exports = {
  getBookings,
  getBookingById,
  getBookingByUser,
  getBookingByRoom,
  createBooking,
  updateBooking,
  deleteBooking,
};
