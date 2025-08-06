const url = new URL(location.href); // creating a url object from the current url
// once we have the url object we can access the parameters of the url
const movieId = parseInt(url.searchParams.get('id')); // getting the id parameter from the url and converting to integer

const movieTitle = url.searchParams.get('title'); // getting the title parameter from the url



const APILINK = 'your_backend_review_server/api/v1/reviews/';
// connecting to our backend reviews server


const main = document.getElementById("section");
const title = document.getElementById('title');

title.innerText = movieTitle; // setting the title of the movie to the title parameter from the url

const div_new = document.createElement('div');
div_new.innerHTML = ` 
    <div class="row">
      <div class="column">
        <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review','new_user')">💾</a>
          </p>
        </div>
      </div>
    </div>
  ` // creating a new review card with the review and user textareas and the save button
main.appendChild(div_new); // appending the new review card to the main element


returnReviews(APILINK);

function returnReviews(url) {
  fetch(url + "movie/" + movieId).then(res => res.json()) // url + "movie/" + movieId is the url to get the reviews for a specific movie
    .then(function(data) {
      console.log(data);
      data.forEach(review => {
        const div_card = document.createElement('div');
        div_card.innerHTML =
          `<div class="row">
            <div class="column">
              <div class="card" id="${review._id}">
                <p><strong>Review: </strong> ${review.review}</p>
                <p><strong>User: </strong> ${review.user}</p>
                <p><a href="#" onclick="editReview('${review._id}','${review.review}',
                '${review.user}')">✍</a> <a href="#" onclick="deleteReview('${review._id}')">🚮</a></p>
              </div>
            </div>
          </div>
          `; // creating a card for each review and adding the review, user and the edit and delete buttons to the card
        // the links are created using the onclick event and the functions editReview and deleteReview are called with the id of the review as the argument

        main.appendChild(div_card); // appending the card to the main element
      });
    });
}

// function to edit review
function editReview(id, review, user) {

  const element = document.getElementById(id); // accessing card element using id 
  const reviewInputId = 'review' + id; // creating id for review textarea
  const userInputId = 'user' + id; // creating id for user textarea

  element.innerHTML = `
    <p><strong>Review: </strong> 
      <input type="text" id="${reviewInputId}" value="${review}">
    </p>
    <p><strong>User: </strong>
      <input type="text" id="${userInputId}" value="${user}">
    </p>
    <p>
      <a href="#" onclick="saveReview('${reviewInputId}','${userInputId}','${id}')">💾</a>
    </p>
    `; // editing the innerHTML of the card to include the review and user textareas and the save button
}

function saveReview(reviewInputId, userInputId, id = "") {

  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;
  if (id) {
    fetch(APILINK + id, {
      method: 'PUT', // PUT request is used to update data
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review }) // passing the body of the request as a JSON object
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        alert("Review Updated"); // alerting the user that the review has been updated
        location.reload(); // reloading the page to show the updated review
      });
  } else {
    fetch(APILINK + "new", {
      method: 'POST', // POST request is used to create data
      headers: {
        'Accept': 'application/json , text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "user": user, "review": review, "movieId": parseInt(movieId) }) // passing the body of the request as a JSON object
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        alert("Review Saved"); // alerting the user that the review has been saved
        location.reload(); // reloading the page to show the new reviewreturn

      });
  }

}

function deleteReview(id) {
  fetch(APILINK + id, {
    method: 'DELETE', // DELETE request is used to delete data
  })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      alert("Review Deleted"); // alerting the user that the review has been deleted
      location.reload();
    });

}
