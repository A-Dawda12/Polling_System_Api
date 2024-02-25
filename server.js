require('dotenv').config();

const connectUsingMongoose = require('./config/db');
const log = require('./utils/logger');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION!!! shutting down...');
    console.log(err);
    log.error(`error : ${err}`);
    process.exit(1);
});

const app = require('./app');

// Start the server
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
    connectUsingMongoose();
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION!!!  shutting down ...');
    log.error(`error : ${err}`);
    server.close(() => {
        process.exit(1);
    });
});
