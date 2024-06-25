const dotenv = require('dotenv');

dotenv.config();

const config = {
    development: {
        db: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        port: process.env.PORT || 3000
    },
    production: {
        db: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        port: process.env.PORT || 8000
    }
};

const env = process.env.NODE_ENV || 'development';

module.exports = config[env];
