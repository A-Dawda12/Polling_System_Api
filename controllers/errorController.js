// Express automatically knows that this entire function is an error handling middleware by specifying 4 parameters
//import { error } from "winston";
const log = require('../utils/logger');
const globalErrHandler = (err, req, res, next) => {

    if(err.statusCode === undefined){
        err.statusCode = 500;
        err.message = "Oops!! Something went wrong, please try again after sometime"
    }

    err.status = err.status || 'error';

    log.error(`error : ${JSON.stringify(err)}`);

    res.status(err.statusCode).json({
        "resultStatus": {
            "status": err.status,
            "errorCode": err.statusCode,
            "errorMessage": err.message,
            //"stack": err.stack
        }
    });
};

module.exports = {globalErrHandler}