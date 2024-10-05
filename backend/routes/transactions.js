//calling express
const express = require('express')
const {createTransaction, getTransactions} = require('../controllers/transactionController')

// create instance of router
const router = express.Router()

const ExpressBrute = require('express-brute')

const store = new ExpressBrute.MemoryStore()
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 1000 * 60, // 1 min wait after the login attemps
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10, // 10mins lifetime
})

router.post('/', bruteforce.prevent, createTransaction)

 // Fetch all transactions from the database
router.get('/', getTransactions)

module.exports = router