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

router
    .route('/:id/delete')
    .delete(Validate.validateParams, QuestionController.deleteQuestion);

router
    .route('/:id')
    .get(Validate.validateParams, QuestionController.viewQuestion);
    

module.exports = router;