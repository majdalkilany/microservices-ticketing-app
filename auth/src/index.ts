// import * as dotenv from 'dotenv';
// dotenv.config();

import mongoose from 'mongoose';

import { app } from './app';

// listenings

const startUpServer = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found ');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI not found ');
  }
  try {
    mongoose.connect(process.env.MONGO_URI);
    console.log('connected to Mongodb');
  } catch (error) {
    console.log(error);
  }

  app.listen(3000, () => {
    console.log(`app running on port 3000!!! auth server`);
  });
};

startUpServer();
