const express = require('express');
const router = express.Router();
const OptionController = require('../controllers/OptionController');
const Validate = require('../middleware/validator');

router
    .route('/:id/delete')
    .delete(Validate.validateParams, OptionController.deleteOption);

router
    .route('/:id/add_vote')
    .put(Validate.validateParams, OptionController.addVote);
    

module.exports = router;