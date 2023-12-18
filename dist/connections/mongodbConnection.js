import { connect } from "mongoose";
export const connectToMongoDB = async () => {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to database.");
    }
    catch (error) {
        console.log(error, "error in connecting to database");
    }
};
//# sourceMappingURL=mongodbConnection.js.map