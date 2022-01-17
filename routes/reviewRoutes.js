const express = require("express");
const {
  getAllReviews,
  createReview,
  getAReview,
  deleteReview,
  updateReview,
  setTourUserIds,
} = require("../controllers/reviewController");
const { protect, restrictTo } = require("../controllers/authController");

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter.use(protect);

reviewRouter
  .route("/")
  .get(getAllReviews)
  .post(restrictTo("user"), setTourUserIds, createReview);

reviewRouter
  .route("/:id")
  .delete(restrictTo("user", "admin"), deleteReview)
  .get(getAReview)
  .patch(restrictTo("user", "admin"), updateReview);

module.exports = reviewRouter;
