const app = require('./src/app');
const { serverConfig } = require('./src/utils/variables');

// Ensure NODE_ENV is set to 'development' or 'production' (or adjust your logic as needed)
const environment = process.env.NODE_ENV || 'development';

// Fetch port from serverConfig based on environment, default to 3000 if not found
const port = (serverConfig[environment] && serverConfig[environment].PORT) || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port} in ${environment} mode`);
});
