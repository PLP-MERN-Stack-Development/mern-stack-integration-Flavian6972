import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const PostContext = createContext();

// Custom hook to use the context
export const usePosts = () => useContext(PostContext);

// Provider component
export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // always array
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts and categories on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const postsRes = await axios.get("/api/posts");
        const categoriesRes = await axios.get("/api/categories");

        // Ensure posts and categories are arrays
        setPosts(Array.isArray(postsRes.data) ? postsRes.data : postsRes.data.data || []);
        setCategories(
          Array.isArray(categoriesRes.data)
            ? categoriesRes.data
            : categoriesRes.data.data || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // CRUD operations
  const addPost = async (post) => {
    const res = await axios.post("/api/posts", post);
    setPosts((prev) => [...prev, res.data]);
  };

  const updatePost = async (id, updatedPost) => {
    const res = await axios.put(`/api/posts/${id}`, updatedPost);
    setPosts((prev) => prev.map((post) => (post._id === id ? res.data : post)));
  };

  const deletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    setPosts((prev) => prev.filter((post) => post._id !== id));
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        categories,
        loading,
        error,
        addPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
