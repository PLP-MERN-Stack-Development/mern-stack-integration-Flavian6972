import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PostProvider } from "./context/PostContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">

          {/* Main layout */}
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreatePost />} />
              <Route path="/edit/:id" element={<EditPost />} />
              <Route path="/post/:id" element={<SinglePost />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
