const Transactions = require('../models/transactionModel')
const mongoose = require('mongoose')

//get books
const getTransactions = async(req, res) => {
    const {providerEmail} = req.body
    try{
        const transactions = await Transactions.find({providerEmail}).sort({createAt: -1})

        if (!transactions.length){
            return res.status(400).json({error: "No transactions found."})
        }
        res.status(200).json(transactions)
    }
    catch{
        res.status(400).json({error: error.message})
    }
}

//create new book
const createTransaction = async(req, res) => {
    const {amount, currency, providerEmail, recipientName, recipientAccountNumber} = req.body
    try{
        const transaction = await Transactions.create({amount, currency, providerEmail, recipientName, recipientAccountNumber})
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