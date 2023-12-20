import { config } from "dotenv";
import { connectToMongoDB } from "./connections/mongodbConnection.js";
import express from "express";
import morgan from "morgan";
import userRouter from "./routes/user_routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
// app.use("/", (req, res) => {
//   res.send("hello, i am listening");
// });
//middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(morgan("dev")); // GET /api/v1 200 56.248 ms - 34
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/api/user", userRouter);
connectToMongoDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is listening at PORT ${process.env.PORT}`);
    });
});
//# sourceMappingURL=index.js.map