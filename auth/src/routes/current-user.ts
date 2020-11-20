import express, { Request, Response, Router } from 'express';

import { currentUser } from '@ticketsms/common';

const router: Router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
