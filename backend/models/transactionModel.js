const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const crypto = require('crypto-js')
require('dotenv').config()

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount:{
        type:String,
        required:true
    },
    currency:{
        type:String,
        required:true
    },
    providerEmail:{
        type:String,
        required:true
    },
    swiftCode:{
        type:String,
        required: true
    },
    recipientName:{
        type:String,
        required:true
    },
    recipientAccountNumber:{
        type:String,
        required:true
    },
}, {timestamps: true})

transactionSchema.statics.createTransaction = async function (amount, currency, providerEmail, swiftCode, recipientName, recipientAccountNumber){
    
    // code attribution
    // link = https://www.youtube.com/watch?v=iH54fek9xc4
    // title = NodeJS Data Encryption & Decryption using CryptoJS Module #nodejs #crypto
    // author = Proto Coders Point
    // usage = used to encrypt and decrypt things using cryptojs

    const hash = crypto.AES.encrypt(recipientAccountNumber, process.env.SECRET_KEY).toString()
    const transaction = await this.create({amount, currency, providerEmail, swiftCode, recipientName, recipientAccountNumber: hash})
    return transaction 
}

module.exports = mongoose.model('Transactions', transactionSchema) 