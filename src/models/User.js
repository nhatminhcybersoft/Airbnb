const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  return sequelize.define(
    "User",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "user_id",
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: "email",
        validate: {
          isEmail: {
            msg: "Invalid email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        set(value) {
          const salt = bcrypt.genSaltSync();
          const hashPassword = bcrypt.hashSync(value, salt);

          this.setDataValue("password", hashPassword);
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      birthDay: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM("USER", "ADMIN"),
        defaultValue: "USER",
      },
      avatar: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "users",
      timestamps: false,
      defaultScope: {
        attributes: {
          exclude: ["password"],
        },
      },
      hooks: {
        afterSave: (record) => {
          delete record.dataValues.password;
        },
      },
    }
  );
};
