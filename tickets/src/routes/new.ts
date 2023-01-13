import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { requireAuth, validateRequest } from '@majd-tickets/common';
const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('title is required '),
    body('price')
      .isFloat({ gt: 0 })
      .not()
      .isEmpty()
      .withMessage('price must be grater than zero '),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(201);
  }
);

export { router as createTicketsRouter };
