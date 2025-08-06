import ReviewsDAO from "../dao/reviewsDAO.js";
// to access the database we need to use the DAO

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId); // get movieId from request body
      const review = req.body.review; // get review from request body
      const user = req.body.user; // get user from request body

      const reviewResponse = await ReviewsDAO.addReview(
        // call the addReview method from the DAO
        movieId,
        user,
        review,
      );
      res.json({ status: "success" }); // if the review is added successfully, return a success message
    } catch (e) {
      res.status(500).json({ error: e.message }); // if there is an error, return a 500 error
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = req.params.id || {}; // get id from request parameters
      let review = await ReviewsDAO.getReview(id); // call the getReview method from the DAO
      if (!review) {
        res.status(404).json({ error: "Not found" }); // if the review is not found, return a 404 error
        return;
      }
      res.json(review); // if the review is found, return the review
    } catch (e) {
      console.log(`api, ${e}`); // if there is an error, log it
      res.status(500).json({ error: e }); // if there is an error, return a 500 error
    }
  }

  // update review
  static async apiUpdateReview(req, res, next) {
    try {
      let reviewid = req.params.id;
      let review = req.body.review; // get review from request body
      const user = req.body.user; // get user from request body

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewid,
        user,
        review,
      );

      var { error } = reviewResponse;
      if (error) {
        res.status(400).json({ error }); // if error , return 400 error
      }

      if (reviewResponse.modifiedCount === 0) {
        // if no review is modified
        throw new Error("unable to update Review");
      }

      res.json({ status: "success" }); // if success then success message
    } catch (e) {
      // if error then 500 error
      res.status(500).json({ error: e.message });
    }
  }

  // delete review
  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.params.id;
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  // get list of all reviews for a specific movie
  static async apiGetReviews(req, res, next) {
    try {
      let id = req.params.id || {};
      let reviews = await ReviewsDAO.getReviewsByMovieId(id);
      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(reviews);
    } catch (e) {
      console.log(`api, ${e}`); // if error then log error
      res.status(500).json({ error: e }); // if error then 500 error
    }
  }
}
