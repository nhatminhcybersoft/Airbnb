const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Room",
    {
      roomId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "room_id",
      },
      tenPhong: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "ten_phong",
      },
      khach: {
        type: DataTypes.INTEGER,
      },
      phongNgu: {
        type: DataTypes.INTEGER,
        field: "phong_ngu",
      },
      giuong: {
        type: DataTypes.INTEGER,
      },
      phongTam: {
        type: DataTypes.INTEGER,
        field: "phong_tam",
      },
      mota: {
        type: DataTypes.STRING,
        field: "mo_ta",
      },
      giaTien: {
        type: DataTypes.INTEGER,
        field: "gia_tien",
      },
      mayGiat: {
        type: DataTypes.BOOLEAN,
        field: "may_giat",
      },
      banLa: {
        type: DataTypes.BOOLEAN,
        field: "ban_la",
      },
      tivi: {
        type: DataTypes.BOOLEAN,
      },
      dieuHoa: {
        type: DataTypes.BOOLEAN,
        field: "dieu_hoa",
      },
      wifi: {
        type: DataTypes.BOOLEAN,
      },
      bep: {
        type: DataTypes.BOOLEAN,
      },
      doXe: {
        type: DataTypes.BOOLEAN,
        field: "do_xe",
      },
      hoBoi: {
        type: DataTypes.BOOLEAN,
        field: "ho_boi",
      },
      banUi: {
        type: DataTypes.BOOLEAN,
        field: "ban_ui",
      },
      hinhAnh: {
        type: DataTypes.STRING,
        field: "hinh_anh",
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "location_id",
      },
    },
    {
      tableName: "rooms",
      timestamps: false,
    }
  );
};
