const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const ExpressBrute = require('express-brute')

const createToken = (_id) => {
    jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}

//login user
const loginUser = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)

        // after sign up, but just before reponse form server
        const token = createToken(user._id)

        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 60 * 1000, //days, hours, minutes, seconds, milliseconds
            sameSite: 'Lax'//strict and none
        })
        res.status(200).json({email})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

//sign up user
const signupUser = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.signup(email, password)

        // after sign up, but just before reponse form server
        const token = createToken(user._id)

        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 60 * 60 * 1000, //days, hours, minutes, seconds, milliseconds
            sameSite: 'Strict'
        })
        res.status(200).json({email})
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const logoutUser = async(req, res) => {
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