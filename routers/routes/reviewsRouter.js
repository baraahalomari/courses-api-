const reviewsRouter = require('express').Router();
const {
  addReviews,
  updateReviews,
  deleteReviews,
  getReviews,
} = require('../controllers/reviewsControler');

reviewsRouter.post("/", addReviews);
reviewsRouter.put("/:review_id", updateReviews);
reviewsRouter.delete("/:review_id", deleteReviews);
reviewsRouter.get("/:course_id", getReviews);

module.exports = reviewsRouter