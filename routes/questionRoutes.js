const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/QuestionController');
const Validate = require('../middleware/validator');

router
    .route('/create')
    .post(Validate.validateCreateQuestion, QuestionController.createQuestion);

router
    .route('/:id/options/create')
    .post(Validate.validateCreateOption, QuestionController.createOptions);

module.exports = router;