import express from "express";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import cors from "cors";
import userPostRoute from "./routes/userPost.route.js";
import path from "path";
dotenv.config({});

const app = express();
const PORT = 3001 || process.env.PORT;

const _dirname = path.resolve();

const corOption = {
    origin: ["http://localhost:5173"],
    credentials: true,
};
app.use(cors(corOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", userPostRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
