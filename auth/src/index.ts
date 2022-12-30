// import * as dotenv from 'dotenv';
// dotenv.config();

import mongoose from 'mongoose';

import { app } from './app';

// listenings

const startUpServer = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('connected to Mongodb');
  } catch (error) {
    console.log(error);
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET not found ');
  }
  app.listen(3000, () => {
    console.log(`app running on port 3000!!! auth server`);
  });
};

startUpServer();
