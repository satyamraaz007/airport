// src/utils/variables.js

const dotenv = require('dotenv');

dotenv.config();

const getDatabaseConfig = () => {
    // Database configuration based on environment
    if (process.env.NODE_ENV === 'production') {
        return {
            DB_HOST: process.env.DB_HOST_PROD,
            DB_USER: process.env.DB_USER_PROD,
            DB_PASSWORD: process.env.DB_PASSWORD_PROD,
            DB_NAME: process.env.DB_NAME_PROD,
            PORT: process.env.PORT_PROD
        };
    } else {
        return {
            DB_HOST: process.env.DB_HOST_DEV,
            DB_USER: process.env.DB_USER_DEV,
            DB_PASSWORD: process.env.DB_PASSWORD_DEV,
            DB_NAME: process.env.DB_NAME_DEV,
            PORT: process.env.PORT_DEV
        };
    }
};

const serverConfig = {
    development: {
        PORT: process.env.PORT_DEV || 3000
    },
    production: {
        PORT: process.env.PORT_PROD || 3000
    }
};

const razorpayConfig = {
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
};

module.exports = {
    getDatabaseConfig,
    serverConfig,
    razorpayConfig
};
