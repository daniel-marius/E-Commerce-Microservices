import express, { Request, Response, Router } from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@ticketsms/common';

const router: Router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await Ticket.findById(id.toString());

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
