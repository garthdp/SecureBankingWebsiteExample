//calling express
//define all constants
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
const path = require('path')

//imports
const userRoutes = require('./routes/users')
const transactionRoutes = require('./routes/transactions')

//creating express package
const app = express()

//sanitize json requests
app.use(express.json())

// Clickjacking protection middleware
//code attribution
// link = https://cheatsheetseries.owasp.org/cheatsheets/Clickjacking_Defense_Cheat_Sheet.html
// link = https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html
// used for = to add click jacking protection
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Content-Security-Policy", "frame-ancestors 'self'");
    next();
});

app.use('/api/users', userRoutes)
app.use('/api/transaction', transactionRoutes)

//creatng ssl server
const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

//connecting to mongodb
mongoose.connect(process.env.MONGO_URI)
.then(() => {
        sslServer.listen(process.env.PORT, () => {
            console.log("HTTPS now running")
        })
})
.catch((error)=>{
    console.log(error)
})
