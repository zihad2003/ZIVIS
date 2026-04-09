import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});
import connectDB from "./config/db.js";
import { app } from "./app.js";
import authServices from "./services/authServices.js";

connectDB()
    .then(async () => {
        await authServices.seedAdmin();
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
