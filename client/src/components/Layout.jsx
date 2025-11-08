import { Link } from "react-router-dom";
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">
            <Link to="/">MERN Blog 🩺</Link>
          </h1>
          <nav className="space-x-4">
            <Link className="hover:underline" to="/">Home</Link>
            <Link className="hover:underline" to="/create">New Post</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="grow container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} MERN Blog. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
