const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "BookingRoom",
    {
      bookingId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "booking_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      roomId: {
        type: DataTypes.INTEGER,
        field: "room_id",
      },
      ngayDen: {
        type: DataTypes.DATE,
        field: "ngay_den",
      },
      ngayDi: {
        type: DataTypes.DATE,
        field: "ngay_di",
      },
      soLuongKhach: {
        type: DataTypes.INTEGER,
        field: "so_luong_khach",
      },
    },
    {
      tableName: "bookingRooms",
      timestamps: false,
    }
  );
};
