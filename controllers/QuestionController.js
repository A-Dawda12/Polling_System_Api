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


//Delete Question and corresponding options
module.exports.deleteQuestion = async (req, res, next) => {
  try {
      const questionId = req.params.id;
      const question = await Question.findById(questionId);

      // if even one of the options of question has votes. It won't be deleted
      if (question.totalVotes > 0) {
        throw({statusCode : 400, message : "Atleast one of options has votes"});
      }

      // delete all the options of the question
      await Option.deleteMany({ question: questionId });

      // delete question based on id
      await Question.findByIdAndDelete(questionId);

      return res.status(200).json({
        success: true,
        message: 'Question and associated options deleted successfully!',
      });
  } catch (err) {
      next(err)
  }
};


//View Question, options and votes 
module.exports.viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    // populate question with all of its options
    const question = await Question.findById(questionId).populate({
      path: 'options',
      model: 'Option',
    });

    if (!question) {
      throw({statusCode : 400, message : "Question not found"});
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    next(err);
  }
};