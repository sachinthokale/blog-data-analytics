import axios from "axios";
import lodash from "lodash";

const fetchBlogData = async (req, res) => {
  try {
    const headers = {
      "x-hasura-admin-secret":
        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
    };
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      { headers }
    );

    if (!response || !response.data || !response.data.blogs) {
      return res.status(500).json({ error: "Failed to fetch blog data" });
    }

    // Extract the blog data from the response
    const blogData = response.data.blogs;

    // Analytics using Lodash
    const totalBlogs = lodash.size(blogData); // Calculate total number of blogs
    const longestBlog = lodash.maxBy(blogData, (blog) => blog.title.length); // Find the blog with the longest title
    const blogsWithPrivacy = lodash.filter(blogData, (blog) =>
      blog.title.toLowerCase().includes("privacy")
    ); // Find blogs with "privacy" in the title
    const uniqueBlogTitles = lodash.uniqBy(blogData, (blog) =>
      blog.title.trim().toLowerCase()
    ); // Create an array of unique blog titles

    //  JSON object with statistics
    const statistics = {
      totalBlogs,
      longestBlogTitle: longestBlog ? longestBlog.title : "",
      blogsWithPrivacy: blogsWithPrivacy.length,
      uniqueBlogTitles: uniqueBlogTitles.map((blog) =>
        blog.title.toLowerCase()
      ),
    };

    res.json(statistics);
  } catch (error) {
    console.error("Error fetching and analyzing blog data:", error);
    res.status(500).json({ error: "Failed to fetch and analyze blog data" });
  }
};

const searchBlogData = async (req, res) => {
  try {
    const query = req.query.query || "";
    const headers = {
      "x-hasura-admin-secret":
        "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
    };
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      { headers }
    );

    if (!response || !response.data || !response.data.blogs) {
      return res.status(500).json({ error: "Failed to fetch blog data" });
    }

    const blogData = response.data.blogs;

    // Implement search functionality (case-insensitive)
    const filteredBlogs = blogData.filter((blog) =>
      blog.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json(filteredBlogs);
  } catch (error) {
    console.error("Error fetching and filtering blog data:", error);
    res.status(500).json({ error: "Failed to fetch and filter blog data" });
  }
};

// Define cache objects using memoize method from lodash
export const fetchBlogDataCache = lodash.memoize(
  fetchBlogData,
  (req) => req.url
);
export const searchBlogDataCache = lodash.memoize(
  searchBlogData,
  (req) => req.url + req.query.query
);
