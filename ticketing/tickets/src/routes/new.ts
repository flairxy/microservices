import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@flairxy/tickets-common';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 }) //gt: means greater than
      .withMessage('Price must be greater than zero'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    let user = req.currentUser!; //the current user is always set by our currentuser middleware, and the exclamation
    //mark is telling typescript to ignore.
    const ticket = Ticket.build({
      title,
      price,
      userId: user.id, //the
    });

    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
