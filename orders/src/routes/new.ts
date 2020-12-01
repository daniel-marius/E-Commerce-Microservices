import mongoose from "mongoose";
import express, { Request, Response, Router } from "express";
import { requireAuth, validateRequest } from "@ticketsms/common";
import { body } from "express-validator";

const router: Router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };