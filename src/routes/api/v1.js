import { Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { setupGoogleStrategy } from '../../middlewares/passport.js';
import { config } from 'dotenv';
import { userAuthToken } from '../../middlewares/authUser.js';

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

export default router;
