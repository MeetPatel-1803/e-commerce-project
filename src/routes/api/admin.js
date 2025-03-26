import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { setupGoogleStrategy } from '../../middlewares/passport.js';
import { config } from 'dotenv';
import { userAuthToken } from '../../middlewares/authUser.js';
import { userAuthRole } from '../../middlewares/authUserRole.js';
import { USER_ROLE } from '../../utils/constants.js';
import {
  addProductReview,
  deleteProductReviews,
  getAllProductReviews
} from '../../controllers/userControllers/reviewController.js';

config();

const router = Router();

setupGoogleStrategy('/api/admin/google/callback'); // Default callback for vendor

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
    const payload = { id: req.user.id };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) throw err;
      res.redirect(
        `http://${process.env.ADMIN_DOMAIN}.localhost:${process.env.ADMIN_PORT}/login-success?token=${token}`
      );
    });
  }
);

// APIs That required Authorization

router.use('/', userAuthToken);
router.use('/admin', userAuthRole([USER_ROLE.ADMIN]));

// ------------------------------------------------------------------------

router.post('/:productId/review', addProductReview);
router.get('/:productId/review', getAllProductReviews);
router.delete('/:productId/review/:reviewId', deleteProductReviews);

export default router;
