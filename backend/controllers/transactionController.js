const Transactions = require('../models/transactionModel')
const mongoose = require('mongoose')
const crypto = require('crypto-js')
require('dotenv').config()

//get transactions
const getTransactions = async(req, res) => {
    const {providerEmail} = req.query
    try{
        // finds users transactions
        const transactions = await Transactions.find({providerEmail}).sort({createAt: -1})
        // decrypts transaction information so that user can see it
        transactions.forEach(transaction => {
            const bytes = crypto.AES.decrypt(transaction.recipientAccountNumber, process.env.SECRET_KEY)
            transaction.recipientAccountNumber = bytes.toString(crypto.enc.Utf8)
        })

        if (!transactions.length){
            return res.status(400).json({error: "No transactions found."})
        }
        res.status(200).json(transactions)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}

//create new transaction
const createTransaction = async(req, res) => {
    const {amount, currency, providerEmail, swiftCode, recipientName, recipientAccountNumber} = req.body
    try{
        // adds transaction to database
        const transaction = await Transactions.createTransaction(amount.toString(), currency, providerEmail, swiftCode, recipientName, recipientAccountNumber.toString())
        // sends decrypted transaction in response back so that it can be added to transaction list
        const bytes = crypto.AES.decrypt(transaction.recipientAccountNumber, process.env.SECRET_KEY)
        transaction.recipientAccountNumber = bytes.toString(crypto.enc.Utf8)
        res.status(200).json(transaction)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getTransactions, 
    createTransaction
}