import express from "express";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
import { generateChatCompletion } from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);
export default chatRoutes;
