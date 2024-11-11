const Transactions = require('../models/transactionModel')
const mongoose = require('mongoose')
const crypto = require('crypto-js')
const validator = require('validator')
require('dotenv').config()

const getAllTransactions = async (req, res) => {
    try {
       
        const transactions = await Transactions.find().sort({ createAt: -1 });

        // Decrypt each transaction's recipient account number
        transactions.forEach(transaction => {
            const bytes = crypto.AES.decrypt(transaction.recipientAccountNumber, process.env.SECRET_KEY);
            transaction.recipientAccountNumber = bytes.toString(crypto.enc.Utf8);
        });

        if (!transactions.length) {
            return res.status(400).json({ error: "No transactions found." });
        }
        res.status(200).json(transactions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const verifyTransaction = async (req, res) => {
    const { id } = req.params; // Transaction ID to be verified
    try {
        const transaction = await Transactions.findById(id);
        
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found." });
        }
        
        transaction.status = "Verified"; // Update status to Verified
        await transaction.save(); // Save the updated transaction

        res.status(200).json({ message: "Transaction verified successfully.", transaction });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//get transactions
const getTransactions = async(req, res) => {
    var {providerEmail} = req.query

    if (!validator.isEmail(providerEmail)) {
        return res.status(400).json({ error: "Invalid provider email format." })
    }
    providerEmail = validator.normalizeEmail(providerEmail)

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
    createTransaction,
    getAllTransactions,
    verifyTransaction
}