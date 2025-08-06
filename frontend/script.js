const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=your_api_key&page=1';
// specifies from where we can access the API from

const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// root path to every single images of movies
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=your_api_key&query=";
// specifies how we are going to search for something and get the results from the API


const main = document.getElementById("section"); // gets the section element from the HTML file

const form = document.getElementById("form"); // gets the form element from the HTML file
const search = document.getElementById("query"); // get the query element from the HTML file

returnMovies(APILINK); // calls the returnMovies function with the APILINK as the argument
function returnMovies(url) {
  fetch(url).then(res => res.json()) // fetches the data from the API and converts it to JSON format
    .then(function(data) { // then we get the data from the API and we can do something with it
      console.log(data.results);
      data.results.forEach(element => {
        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');
        // setAttribute is used to set the value of an attribute on the specified element.
        const div_row = document.createElement('div');
        div_row.setAttribute('class', 'row');

        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.setAttribute('id', 'image');

        const title = document.createElement('h3');
        title.setAttribute('id', 'title');
        // h3 is the heading tag for the title of the movie
        const center = document.createElement('div');
        center.className = 'center-content';
        // center-content is the class name for the center content of the movie


        title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews</a>`;
        // here we are creating a link to the movie.html page and passing the id and title of the movie as parameters 
        image.src = IMG_PATH + element.poster_path;
        // poster_path is the path to the image of the movie

        center.appendChild(image);
        div_card.appendChild(center);
        div_card.appendChild(title);
        div_column.appendChild(div_card);
        div_row.appendChild(div_column);

        main.appendChild(div_row);
      });
    });
}

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents the default action of the form
  main.innerHTML = ''; // clears the main element

  const searchItem = search.value; // gets the value of the query element
  if (searchItem) {
    returnMovies(SEARCHAPI + searchItem); // calls the returnMovies function with the SEARCHAPI and the searchItem as the argument
    search.value = ''; // clears the query element
  }
});

