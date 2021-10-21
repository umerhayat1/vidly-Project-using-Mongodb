const config = require('config')

module.exports = function () {
    //execute if jwtPrivatekey environment variable is not set
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined');

    }
}