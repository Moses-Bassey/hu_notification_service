/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    seederStorage: 'sequelize',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT ?? 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    seederStorage: 'sequelize',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT ?? 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    seederStorage: 'sequelize',
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: process.env.DATABASE_DIALECT ?? 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  seederStorage: 'sequelize',
};
