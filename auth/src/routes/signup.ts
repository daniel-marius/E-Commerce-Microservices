import express, { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";

import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router: Router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password length must be between 6 and 20 characters!")
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    console.log('Creating a user...');
    throw new DatabaseConnectionError();

    res.send({  });
  }
);

export { router as signupRouter };
