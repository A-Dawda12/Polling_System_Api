const Question = require('./questionRepository');
const Option = require('./optionRepository');
const log = require('../utils/logger');


async function deleteOption(correlationId, optionId){
    try {
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

    } catch (error) {
        log.error(error);
        if(error.response !== undefined) {
            error.statusCode = error.response.status;
            error.status = error.response.status;
            error.stack = error.response.data;
        }
        throw error;
    }
}


async function addVote(correlationId, optionId){
    try {
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

        log.info(`${correlationId} addVote question after option added : ${JSON.stringify(question)}`);

        log.info(`${correlationId} addVote option : ${JSON.stringify(option)}`);
        return option;

    } catch (error) {
        log.error(error);
        if(error.response !== undefined) {
            error.statusCode = error.response.status;
            error.status = error.response.status;
            error.stack = error.response.data;
        }
        throw error;
    }
}


module.exports = {deleteOption, addVote}