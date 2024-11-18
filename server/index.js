import express from "express"
import connectDB from "./utils/db.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import cors from "cors"
import userPostRoute from "./routes/userPost.route.js"
dotenv.config({})

const app = express()
const PORT = 3001 || process.env.PORT

const corOption = {
    origin: ["http://localhost:5173"],
    credentials: true
}
app.use(cors(corOption))
app.use(express.urlencoded({ extended:true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));


//api
app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", userPostRoute)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB()
})
