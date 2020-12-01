import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.delete('/api/orders/:orderId', async (req: Request, res: Response) => {
  res.send({});
});

export { router as deleteOrderRouter };
