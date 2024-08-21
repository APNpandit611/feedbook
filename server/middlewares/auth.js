import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: "You are not authenticated",
                success:false
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        if (!decoded){
            return res.status(400).json({
                message: "Invalid token",
                success:false
            })
        }

        req.id = decoded.userID
        next()

    } catch (error) {
        console.log(error)
    }
}

export default isAuth