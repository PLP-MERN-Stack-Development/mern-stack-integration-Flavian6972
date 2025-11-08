const express = require('express');
const router = express.Router();
const { body, param, validationResult } = require('express-validator');

const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/PostController');

// GET /api/posts
router.get('/', getPosts);

// GET /api/posts/:id
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid post ID')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  getPostById
);

// POST /api/posts
router.post(
  '/',
  (req, res, next) => {
    console.log("📦 Incoming POST data:", req.body); // 👈 Add this line
    next();
  },
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
    body('body').notEmpty().withMessage('Body is required'),
    body('author').optional().isString(),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('published').optional().isBoolean(),
    body('coverImage').optional().isString()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createPost
);

// PUT /api/posts/:id
router.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid post ID'),
    body('title').optional().trim().isLength({ max: 200 }),
    body('body').optional(),
    body('author').optional().isString(),
    body('category').optional().isString().withMessage('Category must be a string'),
    body('published').optional().isBoolean(),
    body('coverImage').optional().isString()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  updatePost
);

// DELETE /api/posts/:id
router.delete(
  '/:id',
  [ param('id').isMongoId().withMessage('Invalid post ID') ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
  deletePost
);

module.exports = router;


