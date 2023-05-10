const { sequelize } = require(".");
const { DataTypes, Sequelize } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "comment_id",
      },
      userId: {
        type: DataTypes.INTEGER,
        field: "user_id",
      },
      roomId: {
        type: DataTypes.INTEGER,
        field: "room_id",
      },
      ngayBinhLuan: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        field: "ngay_binh_luan",
      },
      noiDung: {
        type: DataTypes.STRING,
        field: "noi_dung",
      },
      saoBinhLuan: {
        type: DataTypes.INTEGER,
        field: "sao_binh_luan",
      },
    },
    {
      tableName: "comments",
      timestamps: false,
    }
  );
};
