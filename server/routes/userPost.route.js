import express from "express"
import { getPostById, getPosts, updatePostById, userPost } from "../controllers/post.controller.js"
import isAuth from "../middlewares/auth.js"


const route = express.Router()

route.post("/userPost", isAuth, userPost)
route.get("/get", isAuth, getPosts)
route.get("/get/:id", isAuth, getPostById)
route.put("/update/:id", isAuth, updatePostById)



export default route