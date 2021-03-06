const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      max: 5,
      min: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must to belong to a user"],
    },
  },
  {
    toJSON: { virtual: true },
    toObject: { virtuals: true },
  }
);

// Query middlewares

// Populate user/tour when get review details
reviewSchema.pre(/^find/, function (next) {
  //   this.populate({
  //     path: "user",
  //     select: "name photo",
  //   }).populate({ path: "tour", select: "name" });

  this.populate({
    path: "user",
    select: "name photo",
  })

  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
