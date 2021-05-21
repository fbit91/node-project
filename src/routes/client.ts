import clientController from "../controllers/client.controller";
import express, { Request, Response } from "express";
var authController = require("../controllers/auth");

const router = express.Router();
// Create endpoint handlers for /clients
router
  .route("/clients")
  .post(authController.isAuthenticated, clientController.postClients)
  .get(authController.isAuthenticated, clientController.getClients);

export { router as clientRouter };
