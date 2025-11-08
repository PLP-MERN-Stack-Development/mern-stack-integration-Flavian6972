// pages/SinglePost.jsx
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext"; // <-- Import usePosts now

const SinglePost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Assume your PostContext exposes fetchPostById, deletePost, and a refresh function
  const { deletePost, fetchPostById, posts } = usePosts(); 
  
  // Use local state to handle the post data being fetched individually
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch the post
  const getPost = async (postId) => {
    try {
      setLoading(true);
      // If your context has a fetchPostById method (recommended), use it
      const fetchedPost = await fetchPostById(postId);
      setPost(fetchedPost);
      setError(null);
    } catch (err) {
      // Fallback: If fetchPostById isn't available, try finding in context array
      const postInContext = posts.find(p => p._id === postId);
      if (postInContext) {
        setPost(postInContext);
      } else {
        setError("Failed to fetch post or post not found.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id, fetchPostById]); // Rerun fetch when ID changes

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        // Call deletePost from context, which handles API and state update
        await deletePost(id);
        navigate("/"); // Navigate back to the home page after successful deletion
      } catch (err) {
        alert(`Failed to delete post: ${err.message}`);
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 text-sm mb-2">
        By {post.author?.name || post.author || "Unknown"} |{" "}
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      {post.featuredImage && (
        <img src={post.featuredImage} alt={post.title} className="w-full h-auto mb-4 rounded-lg object-cover" />
      )}
      <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.body}</p>
      <p className="text-gray-500 text-sm mb-4">
        Category: {post.category?.name || post.category || "Uncategorized"}
      </p>

      <div className="flex gap-4">
        <Link
          to={`/edit/${post._id}`} // Link to edit page
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
        >
          Edit Post
        </Link>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete Post
        </button>
      </div>
      
      <Link
        to="/"
        className="inline-block mt-6 text-blue-600 hover:underline"
      >
        ← Back to all posts
      </Link>
    </div>
  );
};

export default SinglePost;