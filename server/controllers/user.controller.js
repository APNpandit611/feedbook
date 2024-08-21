import { User } from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie-parser"

export const register = async (req, res) => {
    try {
        const {name, email, password, phone} = req.body
        if (!name || !email || !password || !phone){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }

        const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({
                message:"Email already exists",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        
        await User.create({
            name,
            email,
            password:hashedPassword,
            phone
        })

        return res.status(201).json({
            message:"user registered successfully",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }

        let user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({
                message:"invalid email or password",
                success:false
            })
        }

        const isHashPasswordMatched = await bcrypt.compare(password, user.password)
        if(!isHashPasswordMatched){
            return res.status(400).json({
                message:"invalid email or password",
                success:false
            })
        }

        const tokenData = {userID : user._id}
        
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }

        const token = jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:"1d"})

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly: true, sameSite:"strict"}).json({
            message: `Welcome Back ${user.name}`,
            user,
            success: true
        })
    
    } catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message: "logged out successfully",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const update = async (req, res) => {
    try {
        const {name, password, email, phone} = req.body
        const userId = req.id

        let user = await User.findById(userId)
        if(!user){
            return res.status(400).json({
                message:"user doenst exits",
                success:false
            })
        }

        if (name) user.name = name
        if (password) user.password = await bcrypt.hash(password, 10)
        if (email) user.email = email
        if (phone) user.phone = phone

        await user.save()

        user = {
            _id: user._id,
            name: user.name,
            password: user.password,
            email: user.email,
            phone: user.phone
        }

        return res.status(200).json({
            message:"User information updated",
            user,
            success:true
        })
    } catch (error) {
        console.log(error)
    }
}