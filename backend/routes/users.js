//calling express
const express = require('express')
const {loginUser, signupUser, logoutUser} = require('../controllers/userController')

//brute force prevents attacks
const ExpressBrute = require('express-brute')

const store = new ExpressBrute.MemoryStore()
// use bruteforce to protect against brute force attacks
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5, // user has 5 free tries before they are locked from making requests
    minWait: 1000 * 60, // 1 min wait after the login attemps
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10, // 10mins lifetime
})

const router = express.Router()

router.post('/login', loginUser)

 // signup
router.post('/signup', bruteforce.prevent,  signupUser)

 // Logout
 router.get('/logout', logoutUser)

//export routes
module.exports = router