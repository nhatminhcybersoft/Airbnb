const { sequelize } = require(".");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Location",
    {
      locationId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "location_id",
      },
      tenViTri: {
        type: DataTypes.STRING,
        field: "ten_vi_tri",
      },
      tinhThanh: {
        type: DataTypes.STRING,
        field: "tinh_thanh",
      },
      quocGia: {
        type: DataTypes.STRING,
        field: "quoc_gia",
      },
      hinhAnh: {
        type: DataTypes.STRING,
        field: "hinh_anh",
      },
    },
    {
      tableName: "locations",
      timestamps: false,
    }
  );
};
