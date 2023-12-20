import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createToken } from "../utils/token_manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            message: "All users",
            users,
        });
    }
    catch (error) {
        console.log(error, "error in getAllUsers");
        return res.status(404).json({
            message: "ERROR",
            cause: error.message,
        });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already registered"); //UNAUTHORIZED
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //create token and store cookie
        //remove previous cookies and set the current cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(user._id, user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); //same as that of token
        //cookie crested in browser
        res.cookie(COOKIE_NAME, token, {
            path: "/", // path where cookie is stored,stored in root directory
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, //sign will encrypt the cookie in signed format
        });
        res.status(201).json({ message: "Sign up successful", user }); //CREATED
    }
    catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: "error in signing up user", cause: error.message });
    }
};
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ message: "User not registered" });
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(403).json({ message: "Incorrect password" }); //FORBIDDEN
        //remove previous cookies and set the current cookie
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        const token = createToken(existingUser._id, existingUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); //same as that of token
        //cookie crested in browser
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        // path where cookie is stored,stored in root directory
        //sign will encrypt the cookie in signed format
        return res
            .status(200)
            .json({ message: "Login successful", user: existingUser });
    }
    catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res) => {
    try {
        console.log(res.locals, "locals");
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).json("User not registered or token malfucntioned");
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json("Permissions didn't match");
        }
        return res.status(200).json({ message: "Login successful", user });
    }
    catch (error) {
        return res.status(400).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=userController.js.map