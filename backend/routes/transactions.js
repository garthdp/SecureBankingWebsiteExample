//calling express
const express = require('express')
const {createTransaction, getTransactions,getAllTransactions} = require('../controllers/transactionController')

//brute force prevents attacks
const ExpressBrute = require('express-brute')

const store = new ExpressBrute.MemoryStore()

// to prevent potential hackers from making multiple payments
const bruteforce = new ExpressBrute(store, {
    freeRetries: 10, // user can only make 10 payments at a time
    minWait: 1000 * 60, // 1 min wait after the login attemps
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10, // 10mins lifetime
})

// create instance of router
const router = express.Router()

// create transaciton post request
router.post('/', bruteforce.prevent, createTransaction)

 // Fetch all transactions from the database
router.get('/', getTransactions)

router.get('/all',getAllTransactions )

module.exports = router