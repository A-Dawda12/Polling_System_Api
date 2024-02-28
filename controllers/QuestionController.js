const questionModel = require('../models/questionModel');
const log = require('../utils/logger');

module.exports.createQuestion = async (req, res, next) => {
    try {
      const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      log.info(`${correlationId} createQuestion req body : ${JSON.stringify(req.body)}`);
      const { title } = req.body;
      const question = await questionModel.createQuestion(correlationId, title);
      res.status(201).json({
        success: true,
        question,
      });
    } catch (error) {
      next(error)
    }
};


module.exports.createOptions = async (req, res, next) => {
    try {
      const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      const questionId = req.params.id;
      const { text } = req.body;
      log.info(`${correlationId} createOptions req params: ${JSON.stringify(req.params)}, req body : ${JSON.stringify(req.body)}`)
    
      var option = await questionModel.createOptions(correlationId, questionId, text);
  
      return res.status(201).json({
        success: true,
        option,
      });
    } catch (error) {
      next(error)
    }
  };


//Delete Question and corresponding options
module.exports.deleteQuestion = async (req, res, next) => {
  try {
      const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      log.info(`${correlationId} deletQuestion params : ${JSON.stringify(req.params)}`)
      const questionId = req.params.id;

      await questionModel.deleteQuestion(correlationId, questionId)

      return res.status(200).json({
        success: true,
        message: 'Question and associated options deleted successfully!'
      });
  } catch (err) {
      next(err)
  }
};


//View Question, options and votes 
module.exports.viewQuestion = async (req, res, next) => {
  try {
    const correlationId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    log.info(`${correlationId} viewQuestion params : ${JSON.stringify(req.params)}`);
    const questionId = req.params.id;
    const question = await questionModel.viewQuestion(correlationId, questionId)

    return res.status(200).json({
      success: true,
      question
    });
  } catch (err) {
    next(err);
  }
};