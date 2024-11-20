// Import required modules
const express = require("express"); // Express framework for building web applications
const api = require("./api"); // Module containing API functions
const middleware = require("./middleware"); // Custom middleware
const bodyParser = require("body-parser"); // Middleware for parsing request bodies

// Set the port
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000

// Boot the app
const app = express(); // Create an Express application

// Register the public directory
app.use(express.static(__dirname + "/public")); // Serve static files from the "public" directory

// Use middleware
app.use(middleware.cors); // Enable CORS (Cross-Origin Resource Sharing)
app.use(bodyParser.json()); // Parse JSON request bodies

// Register the routes
app.get("/products", api.listProducts); // Route to list all products
app.get("/products/:id", api.getProduct); // Route to get details of a specific product by ID
app.post("/products", api.createProduct); // Route to create a new product
app.delete("/products/:id", api.deleteProduct); // Route to delete a product by ID
app.put("/products/:id", api.editProduct); // Route to update a product by ID

// Handle root route
app.get("/", api.handleRoot); // Route to handle the root URL

// Use error-handling middleware
app.use(middleware.handleError); // Middleware to handle errors
app.use(middleware.notFound); // Middleware to handle 404 Not Found errors

// Boot the server
app.listen(port, () => console.log(`Server listening on port ${port}`)); // Start the server and log the port
