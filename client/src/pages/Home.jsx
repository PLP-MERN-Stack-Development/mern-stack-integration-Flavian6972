import PostList from "../components/PostList";
import { usePosts } from "../context/PostContext";

const Home = () => {
  const { posts, loading, error } = usePosts();

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

export default Home;

