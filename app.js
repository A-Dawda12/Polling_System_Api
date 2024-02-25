const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const bodyParser = require('body-parser');
const questionRoutes = require('./routes/questionRoutes');
const optionRoutes = require('./routes/optionRoutes');
const {globalErrHandler} = require('./controllers/errorController');
const ApplicationError = require('./utils/applicationError');
const app = express();

// Allow Cross-Origin requests
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Limit request from the same API 
const limiter = rateLimit({
    max: process.env.RATE_LIMIT_REQUESTS,
    windowMs: process.env.RATE_LIMIT_TIME,
    message: 'Too Many Request from this IP, please try again in an hour'
});

app.get('/ip', (request, response) => response.send(request.ip))
app.use('/api', limiter);

// Routes
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/options', optionRoutes);


// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new ApplicationError(404, 'fail', 'undefined route');
   // res.setHeader('Content-Type', 'application/json');
   // res.end(JSON.stringify({ a: 1 }, null, 3));
    next(err, req, res, next);
});

app.use(globalErrHandler);


module.exports = app;