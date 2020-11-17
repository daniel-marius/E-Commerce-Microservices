const NODEPORT = 3000;

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';

const app = express();

// Traffic is proxied through nginx
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
  // next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log('Connected to MongoDB!');
  } catch (err) {
    console.error(err);
  }

  app.listen(NODEPORT, () => {
    console.log(`Listening on port ${NODEPORT}!`);
  });
};

start();
