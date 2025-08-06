import express from "express";
import ReviewsCtrl from "./reviews.controller.js"; // import the reviews controller (we will create this file)

const router = express.Router();

router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews); // get all reviews
router.route("/new").post(ReviewsCtrl.apiPostReview); // post a new review
router
  .route("/:id")
  .get(ReviewsCtrl.apiGetReview) // get a review by id
  .put(ReviewsCtrl.apiUpdateReview) // update a review by id
  .delete(ReviewsCtrl.apiDeleteReview); // delete a review by id

export default router;
// this will allow us to import router in the file that will start the server
