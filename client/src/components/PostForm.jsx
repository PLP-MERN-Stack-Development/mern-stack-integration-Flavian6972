import { useState } from "react";

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [form, setForm] = useState({
    title: initialData.title || "",
    body: initialData.body || "", 
    category: initialData.category || "",
    author: initialData.author || "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full"
      />
      <input
        name="author"
        value={form.author}
        onChange={handleChange}
        placeholder="Author"
        className="border p-2 w-full"
      />

      <textarea
        name="body" 
        value={form.content}
        onChange={handleChange}
        placeholder="Content"
        className="border p-2 w-full"
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder="Category ID"
        className="border p-2 w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Post
      </button>
    </form>
  );
};

export default PostForm;
