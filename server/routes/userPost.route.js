import express, { Router } from "express"
import { deletePostById, getPostById, getPosts, updatePostById, userPost } from "../controllers/post.controller.js"
import isAuth from "../middlewares/auth.js"
import { upload } from "../middlewares/multer.js"


const route = express.Router()

route.post("/userPost", upload.single('picture'), isAuth, userPost)
route.get("/get", getPosts)
route.get("/get/:id", isAuth, getPostById)
route.put("/update/:id", upload.single("picture"), isAuth, updatePostById)
route.delete("/delete/:id", deletePostById)



export default route