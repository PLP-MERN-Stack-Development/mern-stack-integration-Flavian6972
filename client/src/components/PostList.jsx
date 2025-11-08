import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const POSTS_PER_PAGE = 3;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Fetch posts (optionally filtered by category)
  const fetchPosts = async (category = "") => {
    try {
      const url = category ? `/api/posts?category=${category}` : "/api/posts";
      const res = await axios.get(url);
      setPosts(res.data);
      setCurrentPage(1); // Reset to first page on new fetch
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPosts();
  }, []);

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat);
    fetchPosts(cat);
  };

  // Filter posts by search term
  const filteredPosts = posts.filter((post) => {
    const text = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(text) ||
      post.author?.toLowerCase().includes(text)
    );
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Search & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full md:w-1/2"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border rounded px-3 py-2 w-full md:w-1/3"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Posts Grid */}
      {currentPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              <img
                src={post.featuredImage || "/default-post.jpg"}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col justify-between grow">
                <div>
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">
                    By {post.author?.name || post.author || "Unknown"} |{" "}
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 mb-4 line-clamp-3">
                    {post.excerpt || post.body?.slice(0, 100) + "..."}
                  </p>
                </div>
                <Link
                  to={`/post/${post._id}`}
                  className="mt-auto inline-block text-blue-600 font-semibold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No posts found for this category or search term.
        </p>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`px-4 py-2 rounded border ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;

