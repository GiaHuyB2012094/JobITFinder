import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: 60 * 30,
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 1 * 1 * 30 * 60 * 1000
    })
}

export default generateToken;