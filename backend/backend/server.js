import express from "express";
import multer from "multer";
import cors from "cors";
// import axios from "axios";
// import FormData from "form-data";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

const app = express();
const port = 5000;
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Multer configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

app.use(express.json());

// Define a route to register a new user
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Connect to MongoDB
    await client.connect();

    // Access your database and collection
    const database = client.db("tastetresure");
    const collection = database.collection("User");

    // Insert the new user into the database
    await collection.insertOne({ name, email, password });

    // Close the connection to the MongoDB server
    await client.close();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to handle user login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("tastetresure");
    const collection = database.collection("User");

    // Find the user by email
    const user = await collection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not found" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

app.post("/api/recipe", upload.single("img"), async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the database and collection
    const database = client.db("tastetresure");
    const collection = database.collection("Menu Items");

    // Create a new recipe object
    const recipe = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      category_id: req.body.category_id,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    // Insert the recipe data into MongoDB
    await collection.insertOne(recipe);

    // Send success response
    res.status(200).send("Recipe added successfully");
    console.log("Recipe added successfully");
  } catch (error) {
    console.error(error);
    // Send error response
    res.status(500).send("Internal Server Error");
  }
});

// api to fetch recipes
app.get("/api/recipe", async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Access your database and collection
    const database = client.db("tastetresure");
    const collection = database.collection("Menu Items");

    // Query the collection for recipes
    const recipes = await collection.find({}).toArray();

    // Close the connection to the MongoDB server
    await client.close();

    // Send the fetched recipes as a response
    res.json(recipes);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

// Define route for deleting a recipe
app.delete("/api/recipe/:id", async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();

    const { id } = req.params;
    console.log("ID:", id); // Add this line to log the value of id

    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid recipe ID");
    }

    // Connect to the database
    const database = client.db("tastetresure");
    const collection = database.collection("Menu Items");

    // Delete the recipe from MongoDB
    const result = await collection.deleteOne({ _id: ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).send("Recipe not found");
    }

    // Send success response
    res.status(200).send("Recipe deleted successfully");
  } catch (error) {
    console.error("Error deleting recipe:", error);
    // Send error response
    res.status(500).send("Internal Server Error");
  }
});

// Define the route for updating a recipe
app.put("/api/recipe/:id", upload.single("img"), async (req, res) => {
  try {
    // Connect to the MongoDB server
    await client.connect();

    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).send("Invalid recipe ID");
    }

    // Access the database and collection
    const database = client.db("tastetresure");
    const collection = database.collection("Menu Items");

    // Find the recipe by its ID
    const existingRecipe = await collection.findOne({ _id: ObjectId(id) });

    if (!existingRecipe) {
      return res.status(404).send("Recipe not found");
    }

    // Prepare the updated recipe data
    const updatedRecipe = {
      title: req.body.title || existingRecipe.title,
      ingredients: req.body.ingredients || existingRecipe.ingredients,
      category_id: req.body.category_id || existingRecipe.category_id,
    };

    // Check if there's a new image uploaded
    if (req.file) {
      updatedRecipe.img = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    // Update the recipe data
    await collection.updateOne({ _id: ObjectId(id) }, { $set: updatedRecipe });

    // Send success response
    res.status(200).send("Recipe updated successfully");
  } catch (error) {
    console.error("Error updating recipe:", error);
    // Send error response
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
