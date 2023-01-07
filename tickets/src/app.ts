import express, { json } from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';

import { errorHandler } from '@majd-tickets/common';
import { NotFoundError } from '@majd-tickets/common';

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

app.all('*', async () => {
  throw new NotFoundError();
});

// middleware

app.use(errorHandler);

export { app };
