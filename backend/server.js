require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const fs = require('fs')
const path = require('path')
const helmet = require('helmet')

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

//code attribution
// link = https://cheatsheetseries.owasp.org/cheatsheets/Nodejs_Security_Cheat_Sheet.html#:~:text=The%20top-level%20helmet%20function%20is%20a%20wrapper%20around%2014%20smaller
// used for = used to add helmet
app.use(helmet())
// only allows (HTTPS) connections to the server
app.use(helmet.hsts())
// protects against clickjacking by preventing the site form being embedded in frames or iframes
app.use(helmet.frameguard())
//enables the XSS Filter in browsers to prevent reflected XSS attacks
app.use(helmet.xssFilter())
// sets up the Content Security Policy (CSP) to control what resources the browser can load
app.use(
    helmet.contentSecurityPolicy({
      // the following directives will be merged into the default helmet CSP policy
      directives: {
        defaultSrc: ["'self'"],  // default value for all directives that are absent
        scriptSrc: ["'self'"],   // helps prevent XSS attacks
        frameAncestors: ["'none'"],  // helps prevent Clickjacking attacks
        blockAllMixedContent: []
      }
    })
  )
//tells the browser not to change MIME types specified in Content-Type header
app.use(helmet.noSniff())

app.use('/api/users', userRoutes)
app.use('/api/transaction', transactionRoutes)

//sets up https server  by providing the SSL key and certificate
const sslServer = https.createServer({
    // allows for https to be used by using ssl 
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
