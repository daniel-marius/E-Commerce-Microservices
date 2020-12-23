import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@ticketsms/common';

import { createChargeRouter } from './routes/new';

const app = express();

// Traffic is proxied through nginx
app.set('trust proxy', true);

// Chnage secure property to false if we are in a testing environment
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUser);

app.use(createChargeRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
  // next(new NotFoundError());
});

app.use(errorHandler);

export { app };
