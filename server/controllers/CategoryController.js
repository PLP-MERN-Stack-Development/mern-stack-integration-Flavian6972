// server/controllers/categoryController.js
const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');

// GET /api/categories
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

// POST /api/categories
const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // prevent duplicate
  const exists = await Category.findOne({ name: name.trim() });
  if (exists) {
    res.status(400);
    throw new Error('Category already exists');
  }

  const category = new Category({ name: name.trim(), description });
  await category.save();
  res.status(201).json(category);
});

module.exports = {
  getCategories,
  createCategory
};
