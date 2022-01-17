const express = require("express");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require("../controllers/userController");
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
} = require("../controllers/authController");

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.patch("/resetPassword/:token", resetPassword);

// Protect all the routes after this with protect middleware
userRouter.use(protect);

userRouter.patch("/updateMe", updateMe);
userRouter.delete("/deleteMe", deleteMe);
userRouter.get("/me", getMe, getUser);
userRouter.patch("/updateMyPassword", updatePassword);

// Protect all the routes after this with admin check
userRouter.use(restrictTo("admin"));

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = userRouter;
