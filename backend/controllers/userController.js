const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

//login user
const loginUser = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)

        // get user types
        const type = user.userType
        const userEmail  = user.email

        // after sign up, but just before reponse form server
        const token = createToken(user._id)

        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 60 * 1000, //days, hours, minutes, seconds, milliseconds
            sameSite: 'Strict'//strict and none
        })
        
        // returns email and usertype
        res.status(200).json({email: userEmail, userType: type})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//sign up user
const signupUser = async(req, res) => {
    const {name, surname, idNumber, accountNumber, email, password} = req.body
    try{
        const userType = "User"
        // creates user
        const user = await User.signup(name, surname, userType, idNumber, accountNumber, email, password)

        res.status(200).json({ok: "Account created."})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

// logs out user
const logoutUser = async(req, res) => {
    // resets cookie
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: new Date(0),
    })
    res.status(200).json({msg: 'Logged out successfully'})
}

module.exports = {
    loginUser, 
    signupUser,
    logoutUser
}