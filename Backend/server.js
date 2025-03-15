import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";

import productRoutes from "./routes/product.route.js";


dotenv.config(); // Load environment variables

const app = express();

const PORT = process.env.PORT||5000;



// Middlewares
app.use(express.json()); // allows us to accept JSON data
app.use(express.urlencoded({ extended: true })); // allows us to accept URL parameters


app.use("/api/products", productRoutes);

app.listen(PORT,()=>{
  connectDB();
  console.log("Server is running at http://localhost:"+PORT);
});
