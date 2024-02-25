const Question = require('../models/question');
const Option = require('../models/option')

module.exports.createQuestion = async (req, res, next) => {
    try {
      const { title } = req.body;
    
      const question = await Question.create({
        title,
      });
  
      res.status(200).json({
        success: true,
        question,
      });
    } catch (error) {
      next(error)
    }
};


module.exports.createOptions = async (req, res, next) => {
    try {
      const questionId = req.params.id;
      const { text } = req.body;
  
      const question = await Question.findById(questionId);
  
      if (!question) {
        throw({statusCode : 400, message : "Question not found"})
      }
  
      const option = await Option.create({text,question});
  
      // Add link to option
      const linkForVote = `${process.env.VOTELINK}/${option.id}/add_vote`;
      option.link_to_vote = linkForVote;
      option.save();
  
      // put reference of option in question schema
      await question.updateOne({ $push: { options: option } });
  
      return res.status(200).json({
        success: true,
        option,
      });
    } catch (error) {
      next(error)
    }
  };