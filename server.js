import { config } from 'dotenv';
import Express from 'express';
import { createServer } from 'http';
import { dbConnection } from './config/database.js';
import log from './src/utils/console.js';
import passport from 'passport';
import session from 'express-session';
import apiRoutes from './src/routes/index.js';
import i18n from './src/i18n/i18n.cjs';

config();
dbConnection();

const app = Express();
const port = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);
app.use(i18n);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', apiRoutes);

const server = createServer(app);

server.listen(port, () => {
  log.cyan(`Server is Running on port ${port}`);
});
