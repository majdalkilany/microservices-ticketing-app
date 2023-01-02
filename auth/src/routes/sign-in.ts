import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';

import { BadRequestError } from '@majd-tickets/common';
import { validateRequest } from '@majd-tickets/common';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').trim().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (!existingUser) {
      console.log('Wrong password Or Email', 'if user not exist');
      throw new BadRequestError('Wrong password Or Email');
    }
    // user await to
    const passwordMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordMatch) {
      throw new BadRequestError('Wrong password Or Email');
    }
    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_SECRET!
    );

    // Store it in session Object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existingUser);
  }
);

export { router as signInRouter };
