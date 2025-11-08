import axios from "axios";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const CreatePost = () => {
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    try {
      // Send POST request with proper JSON headers
      await axios.post("/api/posts", form, {
        headers: { "Content-Type": "application/json" },
      });

      // Navigate only if POST succeeds
      navigate("/");
    } catch (error) {
      // Log the error for debugging
      console.error("Error creating post:", error.response?.data || error.message);

      // Optionally, show validation errors to the user
      if (error.response?.data?.errors) {
        alert(
          "Failed to create post: " +
            error.response.data.errors.map((e) => e.msg).join(", ")
        );
      } else {
        alert("Failed to create post: " + error.message);
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;

