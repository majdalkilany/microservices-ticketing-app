import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { Password } from '../services/password';

import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middleware/validate-request';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').trim(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      console.log('Wrong password Or Email ');
      throw new BadRequestError('Wrong password Or Email');
    }

    if (!Password.compare(existingUser.password, password)) {
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
