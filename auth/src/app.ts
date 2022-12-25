import express, { json } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { currentUserRouter } from './routes/current-user.routs';
import { signUpRouter } from './routes/sign-up';
import { signInRouter } from './routes/sign-in';
import { signOutRouter } from './routes/sign-out';
import { errorHandler } from './middleware/error-handler';
import { NotFoundError } from './errors/not-found-handler';

const app = express();
app.set('trust proxy', true);

const PORT = 4000;

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

// routs
app.use(currentUserRouter);
app.use(signUpRouter);
app.use(signInRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// middleware

app.use(errorHandler);

export { app };