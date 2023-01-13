import express, { json } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { errorHandler, NotFoundError, currentUser } from '@majd-tickets/common';

import { createTicketsRouter } from './routes/new';

const app = express();
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

// routs
app.use(currentUser);
app.use(createTicketsRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

// middleware

app.use(errorHandler);

export { app };
