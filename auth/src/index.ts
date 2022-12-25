import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { app } from './app';

// listenings

const PORT = process.env.PORT || 4001;
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
  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}!!! auth server`);
  });
};

startUpServer();
