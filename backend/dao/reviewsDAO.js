import { ObjectId } from "mongodb"; // import mongodb

let reviews; // create a variable to hold the reviews collection

export default class ReviewsDAO {
  static async injectDB(conn) {
    // conn is the connection to the database
    if (reviews) {
      return;
    }
    try {
      reviews = await conn.db("reviews").collection("reviews"); // get the reviews collection from the database
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`); // if there is an error, log it
    }
  }

  static async addReview(movieId, user, review) {
    try {
      const reviewDoc = {
        // database entry for review
        movieId: movieId,
        user: user,
        review: review,
      };

      return await reviews.insertOne(reviewDoc); // insert the review into the database
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e }; // return the error
    }
  }

  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) }, // find the review by id
        { $set: { user: user, review: review } }, // update the review
      );

      return updateResponse; // return the update response
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
      });

      return deleteResponse; // return the delete response
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }

  static async getReviewsByMovieId(movieId) {
    try {
      const cursor = await reviews.find({ movieId: parseInt(movieId) }); // find all reviews for a specific movie
      return cursor.toArray(); // return the reviews as an array
    } catch (e) {
      console.error(`Unable to get reviews: ${e}`);
      return { error: e };
    }
  }

  static async getReview(reviewId) {
    try {
      return await reviews.findOne({ _id: new ObjectId(reviewId) });
    } catch (e) {
      console.error(`Unable to get review: ${e}`);
      return { error: e };
    }
  }
}
