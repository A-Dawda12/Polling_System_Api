const { check, param, body, validationResult } = require('express-validator');

// Middleware function to validate the request body for creating a question
const validateCreateQuestion = [
  // Validate title field
  body('title').notEmpty().withMessage('Title is required'),
  
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware if validation passes
  }
];

// Middleware function to validate the request body for creating a options for question
const validateCreateOption = [
  // Validate title field
  param('id').isMongoId(), 
  body('text').notEmpty(), 
  
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware if validation passes
  }
];

const validateDeleteQuestionOrView = [
  // Validate title field
  param('id').isMongoId(), 
  
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Proceed to the next middleware if validation passes
  }
];

module.exports = {validateCreateQuestion, validateCreateOption, validateDeleteQuestionOrView};
