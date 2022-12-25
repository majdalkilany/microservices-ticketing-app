import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { validateRequest } from '../middleware/validate-request';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.log('Email in use ');
      throw new BadRequestError('Email in use');
    }
    const user = User.build({
      email,
      password,
    });
    try {
      await user.save();

      // Generate JWT
      const userJwt = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET!
      );

      // Store it in session Object
      req.session = {
        jwt: userJwt,
      };
      return res.status(201).send(user);
    } catch (err) {
      console.log(err);
    }
  }
);

export { router as signUpRouter };
