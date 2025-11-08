// server/routes/categories.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const { getCategories, createCategory } = require('../controllers/CategoryController');

// GET /api/categories
router.get('/', getCategories);

// POST /api/categories
router.post(
  '/',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ max: 100 }).withMessage('Name too long'),
    body('description').optional().isString()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createCategory
);

module.exports = router;
