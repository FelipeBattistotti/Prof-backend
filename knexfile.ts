require('dotenv').config();

module.exports = {

  development: {
    client: 'mssql',
    connection: process.env.DB_URL,
    migrations: {
      directory: './src/database/migrations'
    },
  },

  test: {
    client: 'mssql',
    connection: process.env.TEST_DB_URL,
    migrations: {
      directory: './src/database/migrations'
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
