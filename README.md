# Full Stack Movie Review App

A simple full-stack web application that allows users to browse movies (using the TMDB API) and add, view, edit, and delete reviews for each movie.

Originally developed using two separate Replit workspaces for easy deployment and testing.

---

## 🌟 Features

- **Browse Popular Movies**  
  Fetches and displays currently popular movies from TMDB.
- **Search Movies by Title**  
  Search for any movie using TMDB’s search endpoint.
- **Reviews Management**  
  - View all reviews for a given movie  
  - Add a new review (username + review text)  
  - Edit or delete existing reviews  
- **Responsive, Clean UI**  

---

## 🛠️ Tech Stack

### Frontend
- **HTML**  
- **CSS**  
- **JavaScript (Vanilla)**  
- Uses **Fetch API** to:
  - Retrieve movie data from TMDB
  - Interact with the backend reviews API

### Backend
- **Node.js**  
- **Express.js**  
- **MongoDB** (Atlas or local)  
- **RESTful API** for reviews management

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository
```bash
git clone https://github.com/ritvik412/full-stack-movie-app.git
cd full-stack-movie-app
```

### 2. Backend Setup
- Navigate to the backend/ folder:
  ```bash
  cd backend
  ```
- Install dependencies from shell:
  ```bash
  npm install express mongoose dotenv cors
  npm install --save-dev nodemon
  ```
- Create a .env file in backend/ with your MongoDB credentials:
  ```bash
  MONGODB_URI=your_mongodb_connection_string
  PORT=5000
  ```
    - Note: Never commit your `.env` file! It is already listed in `.gitignore`
- Add a start script to `package.json`:
  ```bash
  "scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
  }
  ```
- Start the backend server in development mode:
  ```bash
  npm run dev
  ```
  The server will run on `http://localhost:5000` by default.

### 3. Frontend Setup
- Navigate to your frontend folder
```bash
cd ../frontend
```
- (Optional) Install a static server globally:
```bash
npm install -g serve
```
- Start the static server or open directly:
    - **Using `serve`**:
    ```bash
    serve .
    ```
    - **Directly**: Open index.html in your browser.
- Configure API endpoints:
  
    - In `movie.js`, set TMDB_API_KEY to your TMDB API key.
    - In `script.js`, set REVIEWS_API_URL to your backend URL, e.g.:
      ```bash
      const REVIEWS_API_URL = "http://localhost:5000/api/reviews";
      ```

---

# Testing your MongoDB CLuster:

- You can test your mongoDB database by running curl commands through your shell.
- Copy the backend dev url and then run a test review :
  ```bash
  curl -X POST your_dev_url/api/v1/reviews/new -H "Content-Type: application/json" -d '{"movieId":13, "user":"raymond" ,"review":"very good movie"}'
  ```
    - Here we have used POST request to feed the information to our database, we can also use GET,PUT,DELETE,etc for          their respective purposes.
  
---

# Results:
<img width="940" height="887" alt="image" src="https://github.com/user-attachments/assets/7850b4cd-05a9-4da9-8232-8856659a4efa" /><br>
---
<img width="940" height="589" alt="image" src="https://github.com/user-attachments/assets/d1772c36-beab-4838-abba-4eb154b8490a" /><br>
---
<img width="940" height="887" alt="image" src="https://github.com/user-attachments/assets/c22dbc15-5218-4b6c-ba39-d126cdfadcc1" />



