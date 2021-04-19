const express           = require('express')
const app               = express()
const server            = require('http').Server(app)
const cors              = require('cors');    

const io                = require('./io');
const routes            = require('./routes.js');

const port              = 5000;

require('dotenv').config();

global.socketIO = io(server);

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.ALLOW_LIST);
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}); 
app.use(routes);


server.listen(port, () => console.log(`Listening on port ${port}...`))
