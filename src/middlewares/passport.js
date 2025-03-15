import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../models/index.js';
import { config } from 'dotenv';

config();

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: '/api/vendor/google/callback',
//       // callbackURL: '/api/admin/google/callback',
//       // callbackURL: '/api/v1/google/callback',
//       scope: ['profile', 'email']
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         let user = await User.findOne({ email: profile.emails[0].value });
//         if (!user) {
//           user = new User({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             password: null
//           });

//           await user.save();
//         }

//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );

export const setupGoogleStrategy = (callbackURL) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: callbackURL || '/api/v1/google/callback', // Default callback URL
        scope: ['profile', 'email']
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            // user = new User({
            // name: profile.displayName,
            // email: profile.emails[0].value,
            // password: null,
            // role: callbackURL.split('/')[2]
            // });

            // await user.save();
            user = await User.findOneAndUpdate(
              { email: profile.emails[0].value },
              {
                name: profile.displayName,
                email: profile.emails[0].value,
                password: null,
                role: callbackURL.split('/')[2]
              },
              { upsert: true }
            );
          }

          done(null, user);
        } catch (err) {
          done(err, null);
        }
      }
    )
  );
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
