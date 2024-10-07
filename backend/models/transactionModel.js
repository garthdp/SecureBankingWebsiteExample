const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    
    console.log(amount)
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(recipientAccountNumber, salt)
    const transaction = await this.create({amount, currency, providerEmail, swiftCode, recipientName, recipientAccountNumber: hash})
    return transaction 
}

module.exports = mongoose.model('Transactions', transactionSchema) 