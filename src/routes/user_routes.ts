import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignUp,
  verifyUser,
} from "../controllers/userController.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
import { verifyToken } from "../utils/token_manager.js";
const userRouter = Router();

userRouter
  .get("/", getAllUsers)
  .post("/signup", validate(signupValidator), userSignUp)
  .post("/login", validate(loginValidator), userLogin)
  .get("/auth-status", verifyToken, verifyUser); // keeping the user logged in  : verify the JWT token validity and login the user

export default userRouter;
