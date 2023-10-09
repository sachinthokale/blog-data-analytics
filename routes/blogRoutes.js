import express from "express";
import {
  fetchBlogDataCache,
  searchBlogDataCache,
} from "../controllers/blogController.js";

export const router = express.Router();

router.route("/blog-stats").get(fetchBlogDataCache);
router.route("/blog-search").get(searchBlogDataCache);
