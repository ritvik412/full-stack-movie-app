import app from "./server.js"; // import the app
import mongodb from "mongodb"; // import mongodb , it is just a javascript library that allows us to connect to mongodb

import ReviewsDAO from "./dao/reviewsDAO.js"; // import the reviewsDAO
// DAO(Data Access Object) it is a pattern that allows us to access the data in a database

// the DAO pattern seperates the data access client interface from its data access mechanisms, it adapts a specific data resources access API to a generic client interface.

const MongoClient = mongodb.MongoClient; // create a new instance of MongoClient that it will get from mongodb

const mongo_username = process.env["MONGO_USERNAME"]; // get the username from the environment variables
const mongo_password = process.env["MONGO_PASSWORD"]; // get the password from the environment variables

const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.p2makub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// create the uri that will be used to connect to the database
// using backtick(`) allows us to use variables inside the string
// uri : uniform resource identifier , it is a string that identifies a resource on the internet

const port = 5000; // we're running our server on port 5000

MongoClient.connect(uri, {
  maxPoolSize: 50, // max number of connections to the database
  wtimeoutMS: 2500, // wait 2500ms before timing out
  useNewUrlParser: true, // because the mongoDb node.js driver rewrote the tool it uses to parse MongoDB connection strings , we need to set this to true
})
  .catch((err) => {
    console.error(err.stack); // if there is an error, log it
    process.exit(1); // exit the process
  })
  .then(async (client) => {
    await ReviewsDAO.injectDB(client); // inject the client into the DAO
    app.listen(port, () => {
      console.log(`listening on port ${port}`); // if the server is running, log the port
    });
  });
