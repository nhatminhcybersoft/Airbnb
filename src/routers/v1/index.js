const express = require("express");

const authController = require("../../controllers/auth.controller");
const userController = require("../../controllers/user.controller");
const roomController = require("../../controllers/room.controller.js");
const locationController = require("../../controllers/location.controller");
const commentController = require("../../controllers/comment.controller");
const bookingController = require("../../controllers/bookingRoom.controller");
const authorization = require("../../middleware/authorization");
const upload = require("../../middleware/uploadImages");

// path v1: /api/v1
const v1 = express.Router();

// Auth
v1.post("/auth/login", authController.login());
v1.post("/auth/register", authController.register());
v1.get("/auth/profile", authorization, authController.getProfile());

//User
v1.get("/users", userController.getUsers());
v1.get("/users/:userId", authorization, userController.getUserById());
v1.post("/users", authorization, userController.createUser());
v1.put("/users/:userId", authorization, userController.updateUser());
v1.delete("/users/:userId", authorization, userController.deleteUser());
v1.get("/users/search/:name", authorization, userController.searchUser());
v1.post(
  "/users/uploadAvatar/:userId",
  authorization,
  upload.single("file"),
  userController.uploadAvatar()
);

//Room
v1.get("/rooms", roomController.getLocations());
v1.get("/rooms/:roomId", authorization, roomController.getRoomById());
v1.post("/rooms", authorization, roomController.createRoom());
v1.put("/rooms/:roomId", authorization, roomController.updateRoom());
v1.delete("/rooms/:roomId", authorization, roomController.deleteRoom());
v1.get(
  "/rooms/searchRoomByLocation/:locationId",
  authorization,
  roomController.searchRoomsByLocationId()
);
v1.post(
  "/rooms/uploadImage/:roomId",
  authorization,
  upload.single("file"),
  roomController.uploadImage()
);

//Location
v1.get("/locations", locationController.getLocations());
v1.get(
  "/locations/:locationId",
  authorization,
  locationController.getLocationById()
);
v1.post("/locations", authorization, locationController.createLocation());
v1.put(
  "/locations/:locationId",
  authorization,
  locationController.updateLocation()
);
v1.delete(
  "/locations/:locationId",
  authorization,
  locationController.deleteLocation()
);
v1.get(
  "/locations/search/:quocGia",
  authorization,
  locationController.searchLocation()
);
v1.post(
  "/locations/uploadImage/:locationId",
  authorization,
  upload.single("file"),
  locationController.uploadImage()
);

// Comment
v1.get("/comments", authorization, commentController.getComments());
v1.get(
  "/comments/:commentId",
  authorization,
  commentController.getCommentById()
);
v1.get(
  "/comments/user/:userId",
  authorization,
  commentController.getCommentByUser()
);
v1.get(
  "/comments/room/:roomId",
  authorization,
  commentController.getCommentByRoom()
);
v1.post("/comments", authorization, commentController.createComment());
v1.put(
  "/comments/:commentId",
  authorization,
  commentController.updateComment()
);
v1.delete(
  "/comments/:commentId",
  authorization,
  commentController.deleteComment()
);

//booking
v1.get("/booking", authorization, bookingController.getBookings());
v1.get(
  "/booking/:bookingId",
  authorization,
  bookingController.getBookingById()
);
v1.get(
  "/booking/user/:userId",
  authorization,
  bookingController.getBookingByUser()
);
v1.get(
  "/booking/room/:roomId",
  authorization,
  bookingController.getBookingByRoom()
);
v1.post("/booking", authorization, bookingController.createBooking());
v1.put("/booking/:bookingId", authorization, bookingController.updateBooking());
v1.delete(
  "/booking/:bookingId",
  authorization,
  bookingController.deleteBooking()
);

module.exports = v1;
