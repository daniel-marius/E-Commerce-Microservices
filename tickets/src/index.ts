const NODEPORT = 3000;

import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('No JWT_KEY');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('No MONGO_URI!');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
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
