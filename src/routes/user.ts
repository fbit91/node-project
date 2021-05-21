import userController from "../controllers/user.controller";
import express, { Request, Response } from "express";
var authController = require("../controllers/auth");

const router = express.Router();
// Create endpoint handlers for /users
router
  .route("/users")
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

export { router as userRouter };
