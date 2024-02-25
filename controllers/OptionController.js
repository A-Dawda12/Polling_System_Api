const Option = require('../models/option');
const Question = require('../models/question');

// Delete an option based on id
module.exports.deleteOption = async (req, res, next) => {
  try {
    const optionId = req.params.id;
    const option = await Option.findById(optionId);

    if (!option){
        throw({statusCode : 404, message : "Option not found"});
    }

    // if option has atleast one vote it won't be deleted
    if (option.votes > 0) {
        throw({statusCode : 400, message : "This Option has votes"});
    }

    const question = await Question.findById(option.question);

    // remove reference of this option from question's options field
    await question.updateOne({ $pull: { options: optionId } });

    // delete the option
    await Option.findByIdAndDelete(optionId);

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
    const optionId = req.params.id;
    const option = await Option.findById(optionId);

    if (!option) {
      throw({statusCode : 400, message : "Option not found"});
    }

    // add one to the value of votes of option
    option.votes += 1;
    option.save();

    // add one to the value of total votes of question
    const question = await Question.findById(option.question);
    question.totalVotes += 1;
    question.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    next(err)
  }
};