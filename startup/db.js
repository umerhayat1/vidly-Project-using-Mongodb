const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => console.log('Connected to Mongodb...'))
    // .catch(err => winston.info('Could not connect to Mongodb...'))

}