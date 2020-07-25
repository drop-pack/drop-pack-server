const https = require("https")
const fs = require('fs');
const net = require("net")
const database = require("./database/database_handler");
const express = require("express");
const app = express();
const request = require("./requests/request_directer");
const config = require("./config");
const bodyParser = require('body-parser');
const session = require("express-sessions");
const telnetHost = require("./telnet");
const binaryParser = bodyParser.raw({
    type: "*/*"
});

const options = {
    key: fs.readFileSync('cert/key.pem'),
    cert: fs.readFileSync('cert/cert.pem'),
};
/*
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
*/

app.set("strict routing", false);
app.set("x-powered-by", false);

request.direct(app, binaryParser)

https.createServer(options, app).listen(config.port)
telnetHost.start();