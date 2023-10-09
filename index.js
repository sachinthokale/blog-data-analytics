import express, { application } from "express";
import dotenv from "dotenv";
import { router } from "./routes/blogRoutes.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json()); // to accept json data
app.use("/api", router);

app.listen(process.env.PORT, () => {
  console.log(`App running on port : ${process.env.PORT}`);
});
