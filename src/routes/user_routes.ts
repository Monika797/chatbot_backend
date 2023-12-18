import { Router } from "express";
import {
  getAllUsers,
  userLogin,
  userSignUp,
} from "../controllers/userController.js";
import {
  validate,
  signupValidator,
  loginValidator,
} from "../utils/validators.js";
const userRouter = Router();

userRouter
  .get("/", getAllUsers)
  .post("/signup", validate(signupValidator), userSignUp)
  .post("/login", validate(loginValidator), userLogin);

export default userRouter;
