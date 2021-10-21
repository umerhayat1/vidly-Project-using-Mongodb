const winston = require('winston')
require('winston-mongodb')
require('express-async-errors')

module.exports = function () {
    winston.handleExceptions(       //dealing with uncaught exception
        // new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    )
    // throw new Error('Something Failed during startup')

    process.on('unhandledRejection', (ex) => {   //dealing with unhandled promise rejections
        throw ex;
    })
    //throwing unhandled promise rejecetion without catch block 
    // const p = Promise.reject(new Error('Something Failed miserably!'))
    // p.then(() => console.log('Done'))

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));   //logging errors in file
    winston.add(new winston.transports.MongoDB({    //logging errors in Mongodb
        db: 'mongodb://localhost/vidly',
        level: 'info'
    }));
}