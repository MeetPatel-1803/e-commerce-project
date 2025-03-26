import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { setupGoogleStrategy } from '../../middlewares/passport.js';
import { config } from 'dotenv';
import { userAuthToken } from '../../middlewares/authUser.js';
import {
  addProductReview,
  deleteProductReviews,
  getAllProductReviews
} from '../../controllers/userControllers/reviewController.js';
import {
  addItemToCart,
  deleteCartItem,
  getUserCart,
  updateCartItem
} from '../../controllers/userControllers/cartController.js';

config();

const router = Router();

// Open APIs
// ----------------------------------------------------------------------------------

setupGoogleStrategy('/api/v1/google/callback');

/**
 * @route GET /api/auth/google
 * @description Redirect to Google OAuth
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @route GET /api/auth/google/callback
 * @description Google OAuth callback
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const payload = { user: { id: req.user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.redirect(`http://localhost:3004/login-success?token=${token}`);
    });
  }
);

// APIs That required Authorization

router.use('/', userAuthToken);
// ----------------------------------------------------------------------------------

router.post('/:productId/review', addProductReview);
router.get('/:productId/review', getAllProductReviews);
router.delete('/:productId/review/:reviewId', deleteProductReviews);

router.post('/', addItemToCart);
router.get('/', getUserCart);
router.post('/', updateCartItem);
router.delete('/:productId', deleteCartItem);

export default router;
