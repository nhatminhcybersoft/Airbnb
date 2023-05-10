const { AppError } = require("../helpers/error");
const { BookingRoom, User, Room } = require("../models");

const getBookings = async () => {
  try {
    const bookings = await BookingRoom.findAll();
    return bookings;
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (bookingId) => {
  try {
    const booking = await BookingRoom.findByPk(bookingId);
    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    return booking;
  } catch (error) {
    throw error;
  }
};

const getBookingByUser = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const userBooking = await User.findOne({
      where: { userId },
      include: "rents",
    });

    return userBooking;
  } catch (error) {
    throw error;
  }
};

const getBookingByRoom = async (roomId) => {
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    const booking = await Room.findOne({
      where: { roomId },
      include: "isRented",
    });

    return booking;
  } catch (error) {
    throw error;
  }
};

const createBooking = async (data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const room = await Room.findByPk(data.roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    const roomBooking = await BookingRoom.findOne({
      where: { roomId: data.roomId },
    });
    if (roomBooking) {
      throw new AppError(400, "Room is renting");
    }

    const booking = await BookingRoom.create(data);

    return booking;
  } catch (error) {
    throw error;
  }
};

const updateBooking = async (bookingId, data) => {
  try {
    const user = await User.findByPk(data.userId);
    if (!user) {
      throw new AppError(404, "User not found");
    }

    const room = await Room.findByPk(data.roomId);
    if (!room) {
      throw new AppError(404, "Room not found");
    }

    const booking = await BookingRoom.findByPk(bookingId);
    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    const roomBooking = await BookingRoom.findOne({
      where: { roomId: data.roomId },
    });

    if (roomBooking && booking.roomId !== data.roomId) {
      throw new AppError(400, "Room is renting");
    }

    await BookingRoom.update(data, { where: { bookingId } });

    const bookingAfter = await BookingRoom.findByPk(bookingId);

    return bookingAfter;
  } catch (error) {
    throw error;
  }
};

const deleteBooking = async (bookingId) => {
  try {
    const booking = await BookingRoom.findByPk(bookingId);
    if (!booking) {
      throw new AppError(404, "Booking not found");
    }

    await BookingRoom.destroy({ where: { bookingId } });
  } catch (error) {
    throw error;
  }
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
