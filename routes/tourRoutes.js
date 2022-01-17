const express = require("express");
const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require("../controllers/tourController");
const { protect, restrictTo } = require("../controllers/authController");
const reviewRouter = require("./reviewRoutes");

const tourRouter = express.Router();

// Nested routes
// POST /tour/:tourId/reviews
// GET /tour/:tourId/reviews
tourRouter.use("/:tourId/reviews", reviewRouter);

tourRouter
  .route("/monthly-plan/:year")
  .get(protect, restrictTo("admin", "lead-guide", "guide"), getMonthlyPlan);

tourRouter.route("/tour-stats").get(getTourStats);

tourRouter.route("/top-5-cheap").get(aliasTopTours, getAllTours);

tourRouter
  .route("/")
  .get(getAllTours)
  .post(protect, restrictTo("admin", "lead-guide"), createTour);

tourRouter
  .route("/:id")
  .get(getTour)
  .patch(protect, restrictTo("admin", "lead-guide"), updateTour)
  .delete(protect, restrictTo("admin", "lead-guide"), deleteTour);

module.exports = tourRouter;
