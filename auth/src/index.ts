const NODEPORT = 3000;

import mongoose from 'mongoose';

import { app } from './app';

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
