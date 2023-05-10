const { Sequelize } = require("sequelize");
const configs = require("../config");

// const sequelize = new Sequelize("capstone-airbnb", "root", "1234", {
//   dialect: "mysql",
//   host: "localhost",
//   port: 3306,
// });

const sequelize = new Sequelize(
  configs.DB_NAME,
  configs.DB_USER,
  configs.DB_PASSWORD,
  {
    dialect: configs.DB_DIALECT,
    host: configs.DB_HOST,
    port: configs.DB_PORT,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Sequelize connected");
  } catch (error) {
    console.log("Sequelize error ", error);
  }
})();

const User = require("./User")(sequelize);
const Room = require("./Room")(sequelize);
const Location = require("./location")(sequelize);
const Comment = require("./Comment")(sequelize);
const BookingRoom = require("./BookingRoom")(sequelize);

// 1 user - N room
User.hasMany(Room, { as: "rooms", foreignKey: "userId" });
Room.belongsTo(User, { as: "owner", foreignKey: "userId" });

// 1 location - N room
Location.hasMany(Room, { as: "rooms", foreignKey: "locationId" });
Room.belongsTo(Location, { as: "location", foreignKey: "locationId" });

// N User - comment - N Room
User.belongsToMany(Room, {
  as: "commentedRoom",
  through: Comment,
  foreignKey: "userId",
});

Room.belongsToMany(User, {
  as: "userCommented",
  through: Comment,
  foreignKey: "roomId",
});

// N User - Booking - N Room
User.belongsToMany(Room, {
  as: "rents",
  through: BookingRoom,
  foreignKey: "userId",
});

Room.belongsToMany(User, {
  as: "isRented",
  through: BookingRoom,
  foreignKey: "roomId",
});

module.exports = {
  sequelize,
  User,
  Room,
  Location,
  Comment,
  BookingRoom,
};
