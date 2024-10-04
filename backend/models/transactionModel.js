const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    amount:{
        type:Number,
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
    recipientName:{
        type:String,
        required:true
    },
    recipientAccountNumber:{
        type:String,
        required:true
    },
}, {timestamps: true})

module.exports = mongoose.model('Transactions', transactionSchema)