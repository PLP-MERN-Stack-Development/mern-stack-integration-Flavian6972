// server/controllers/postController.js
const asyncHandler = require('express-async-handler');
const Post = require('../models/Post');
const Category = require('../models/Category');

// GET /api/posts
const getPosts = asyncHandler(async (req, res) => {
  // allow optional query like ?category=categoryId or ?author=name
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.author) filter.author = req.query.author;

  const posts = await Post.find(filter)
    .populate('category', 'name')
    .sort({ createdAt: -1 });

  res.json(posts);
});

// GET /api/posts/:id
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id).populate('category', 'name');
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json(post);
});

// POST /api/posts
const createPost = asyncHandler(async (req, res) => {
  const { title, body, author, category, published, coverImage } = req.body;
  const slug = title.toLowerCase().replace(/\s+/g, '-'); 

  // optional: check if category exists if provided
  if (category) {
  let cat = await Category.findOne({ name: category });
  if (!cat) {
    cat = await Category.create({ name: category });
  }
  req.body.category = cat._id; // store ObjectId in post
}

  const post = new Post({
    title,
    slug,
    body,
    author,
    category: category || null,
    published: published ?? true,
    coverImage
  });

  await post.save();
  res.status(201).json(post);
});

// PUT /api/posts/:id
const updatePost = asyncHandler(async (req, res) => {
  const { title, body, author, category, published, featuredImage } = req.body;
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  // Update basic fields
  if (title) {
    post.title = title;
    post.slug = title.toLowerCase().replace(/\s+/g, "-");
  }

  if (body) post.body = body;
  if (author) post.author = author;
  if (category !== undefined) post.category = category; // just store string
  if (published !== undefined) post.published = published;
  if (featuredImage) post.featuredImage = featuredImage;

  const updatedPost = await post.save();
  res.json(updatedPost);
});


// DELETE /api/posts/:id
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  res.json({ message: 'Post removed' });
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
