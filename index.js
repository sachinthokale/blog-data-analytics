import express, { application } from "express";
import dotenv from "dotenv";
import { router } from "./routes/blogRoutes.js";

// Load environment variables from a .env file into the process's environment.
dotenv.config();

const app = express();
// Middleware for parsing URL-encoded data with extended options and a file size limit of 50MB
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(express.json()); // to accept json data
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`App running on port : ${process.env.PORT}`);
});
