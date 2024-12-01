import express from "express";
import cors from "cors";
import connectDB from "./utils/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
import userPostRoute from "./routes/userPost.route.js";
import path from "path";
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3001;

const _dirname = path.resolve();

const corOption = {
    origin: ["https://feedbook-48dd.onrender.com"],
    credentials: true,
};

app.use(cors(corOption));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", userPostRoute);

// for deployment
app.use(express.static(path.join(_dirname, "/client/dist")));
app.get("*", (_, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
