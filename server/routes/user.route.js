import express from "express"
import { googleLogin, login, logout, register, update } from "../controllers/user.controller.js"
import isAuth from "../middlewares/auth.js"

const route = express.Router()

route.post("/register", register)
route.post("/login", login)
route.get("/googleLogin", googleLogin)
route.put("/update", isAuth, update)
route.get("/logout", isAuth, logout)


export default route