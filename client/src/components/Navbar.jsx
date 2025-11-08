import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <h1 className="text-xl font-bold">MERN Blog 🩺</h1>
    <div className="flex gap-x-4">
      <Link to="/">Home</Link>
      <Link to="/create">New Post</Link>
    </div>
  </nav>
);

export default Navbar;
