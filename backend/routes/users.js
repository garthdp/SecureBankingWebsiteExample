//calling express
const express = require('express')
const {loginUser, signupUser, logoutUser} = require('../controllers/userController')

//brute force prevents attacks
const ExpressBrute = require('express-brute')

const store = new ExpressBrute.MemoryStore()
const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 1000 * 60, // 1 min wait after the login attemps
    maxWait: 1000 * 60 * 10,
    lifetime: 1000 * 60 * 10, // 10mins lifetime
})
// login
const router = express.Router()

router.post('/login', bruteforce.prevent, loginUser)

 // signup
router.post('/signup', signupUser)

 // signup
 router.get('/logout', logoutUser)

//export routes
module.exports = router