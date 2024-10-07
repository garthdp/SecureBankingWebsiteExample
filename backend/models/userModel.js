//
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    idNumber:{
        type:String,
        required:true,
        unique: true
    },
    accountNumber:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
}, {timestamps: true})

// adding our own signup function
userSchema.statics.signup = async function (name, surname, idNumber, accountNumber, email, password) {

    // validate if fields are filled
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email invalid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password invalid')
    }
    // validate email

    // validate password

    // verify
    const checkUserEmail = await this.findOne({email})
    if (checkUserEmail){
        throw Error('Email already taken.')
    }
    const checkUserIdNumber = await this.findOne({idNumber})
    if (checkUserIdNumber){
        throw Error('ID Number already taken.')
    }
    const checkUserAccountNumber = await this.findOne({accountNumber})
    if (checkUserAccountNumber){
        throw Error('Account Number already taken.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)
    const hashAccountNumber = await bcrypt.hash(accountNumber, salt)
    const hashIDNumber = await bcrypt.hash(idNumber, salt)
    const user = await this.create({name, surname, idNumber: hashIDNumber, accountNumber: hashAccountNumber, email, password: hashPassword})
    return user

}

// adding our own signup function
userSchema.statics.login = async function (email, password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    
    //try to find the user, not just checking if it exists. if we 
    //can't find anyone then we throw an error
    const user = await this.findOne({email})
    if (!user) {
        throw Error('Incorrect email or password')
    }
    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw Error('Incorrect email or password')
    }
    return user
}

module.exports = mongoose.model('User', userSchema)