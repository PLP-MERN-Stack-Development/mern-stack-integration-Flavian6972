import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePosts } from "../context/PostContext";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { posts, updatePost } = usePosts();

  const [initialData, setInitialData] = useState(null);

  // Load post data to edit
  useEffect(() => {
    const postToEdit = posts.find((p) => p._id === id);
    if (postToEdit) {
      setInitialData({
        title: postToEdit.title,
        body: postToEdit.body,
        category: postToEdit.category?.name || postToEdit.category || "",
        author: postToEdit.author?.name || postToEdit.author || "",
        featuredImage: postToEdit.featuredImage || "",
        published: postToEdit.published ?? true,
      });
    }
  }, [posts, id]);

  if (!initialData) return <p>Loading post data...</p>;

  const handleSubmit = async (updatedData) => {
    await updatePost(id, updatedData);
    navigate(`/post/${id}`); // go back to single post view
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <PostForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
};

export default EditPost;
