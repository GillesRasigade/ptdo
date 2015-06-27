// Update with your config settings.
var config = require('./local');

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host     : '127.0.0.1',
      user     : config.user,
      password : config.password,
      database : 'ptdo',
      charset  : 'utf8'
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      directory: __dirname + '/migrations',
      tableName: 'migrations'
    },
    debug: true
  },

  staging: {
    
  },

  production: {
    
  }

};
