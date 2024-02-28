// const Option = require('../models/optionRepository');
// const Question = require('../models/questionRepository');
const log = require('../utils/logger');
const optionModel = require('../models/optionModel');

// Delete an option based on id
module.exports.deleteOption = async (req, res, next) => {
  try {
    const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    log.info(`${correlationId} deleteOption params : ${JSON.stringify(req.params)}`)
    const optionId = req.params.id;
  
    await optionModel.deleteOption(correlationId, optionId)

    return res.status(200).json({
      success: true,
      message: 'Option deleted successfully!',
    });
  } catch (err) {
    next(err);
  }
};

// To increase the count of votes
module.exports.addVote = async (req, res, next) => {
  try {
    const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    log.info(`${correlationId} addVote params : ${JSON.stringify(req.params)}`);

    const optionId = req.params.id;
    
    const option = await optionModel.addVote(correlationId, optionId)

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    next(err)
  }
};