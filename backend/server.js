import express from "express";
import cors from "cors";

import reviews from "./api/reviews.route.js"; // import the reviews route (we will create this file)

const app = express(); // create an instance of express

app.use(cors()); // enable CORS
app.use(express.json()); // enable JSON parsing

app.use("/api/v1/reviews", reviews); // use the reviews route (specify the api , the version and the route)
// for this url we are using that route

app.use("/", (req, res) => res.status(404).json({ error: "not found" }));
// if the url is not found, return a 404 error

export default app;
// export the app : this will allow us to import app in the file that accesses the database (the file that will start the server)