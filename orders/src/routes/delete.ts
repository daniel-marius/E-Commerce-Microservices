import express, { Request, Response, Router } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError  } from '@ticketsms/common';

import { Order, OrderStatus } from '../models/order';

const router: Router = express.Router();

router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  // Publishing an event saying this was cancelled

  res.status(204).send(order);
});

it.todo('emits an order cancelled event');

export { router as deleteOrderRouter };
