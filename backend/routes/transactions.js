//calling express
const express = require('express')
const {createTransaction, getTransactions} = require('../controllers/transactionController')

// create instance of router
const router = express.Router()

router.post('/', createTransaction)

 // Fetch all transactions from the database
router.get('/', getTransactions)

module.exports = router