require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

const error = require('./middleware/error')
const config = require('config')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose')
const genres = require('./routes/genres');
const customers = require('./routes/customers')
const movies = require('./routes/movies')
const rentals = require('./routes/rentals')
const users = require('./routes/users')
const auth = require('./routes/auth')

const express = require('express');
const app = express();

//dealing with uncaught exception
winston.handleExceptions(
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })
)
// throw new Error('Something Failed during startup')

//dealing with unhandled promise rejections
process.on('unhandledRejection', (ex) => {
    throw ex;
})
//throwing unhandled promise rejecetion without catch block 
const p = Promise.reject(new Error('Something Failed miserably!'))
p.then(() => console.log('Done'))

//logging errors in file
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
//logging errors in Mongodb
winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/vidly',
    level: 'info'
}));


//execute if jwtPrivatekey environment variable is not set
if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to Mongodb...'))
    .catch(err => console.log('Could not connect to Mongodb...'))

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers)
app.use('/api/movies', movies)
app.use('/api/rentals', rentals)
app.use('/api/users', users)
app.use('/api/auth', auth)

app.use(error)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));