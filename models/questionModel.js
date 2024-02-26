const Question = require('./questionRepository');
const Option = require('./optionRepository');
const log = require('../utils/logger');


async function createQuestion(correlationId, title){
    try {
        const question = await Question.create({title});
        log.info(`${correlationId} Create Question : ${question}`);
        return question;
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


async function createOptions(correlationId, questionId, text){
    try {
        const question = await Question.findById(questionId);
  
        if (!question) {
            log.error(`${correlationId} Question not found`)
            throw({statusCode : 400, message : "Question not found"})
        }

        const option = await Option.create({text,question});
  
        // Add link to option
        const linkForVote = `${process.env.VOTELINK}/${option.id}/add_vote`;
        option.link_to_vote = linkForVote;
        option.save();
    
        // put reference of option in question schema
        await question.updateOne({ $push: { options: option } });
        log.info(`${correlationId} createOptions option : ${option}`);
        log.info(`${correlationId} createOptions question : ${question}`)

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


async function deleteQuestion(correlationId, questionId){
    try {
        const question = await Question.findById(questionId);

        // if even one of the options of question has votes. It won't be deleted
        if (question.totalVotes > 0) {
            log.error(`${correlationId} Atleast one of options has votes`);
            throw({statusCode : 400, message : "Atleast one of options has votes"});
        }

        // delete all the options of the question
        await Option.deleteMany({ question: questionId });

        // delete question based on id
        await Question.findByIdAndDelete(questionId);

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


async function viewQuestion(correlationId, questionId){
    try {
        const question = await Question.findById(questionId).populate({
            path: 'options',
            model: 'Option',
        });
      
        if (!question) {
            log.error(`${correlationId} Question not found`)
            throw({statusCode : 400, message : "Question not found"});
        }

        log.info(`${correlationId} viewQuestion based on id : ${question}`);
        return question;
        
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
module.exports = {createQuestion, createOptions, deleteQuestion, viewQuestion}