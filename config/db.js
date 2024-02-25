// const mysql = require('mysql2');

// const crypto = require('./crypto.js');

// require('dotenv').config()

// //const password = crypto.encrypt(process.env.MYSQL_PASSWORD);
// const password = crypto.decrypt(process.env.MYSQL_PASSWORD);
// //return password;

const mongoose = require('mongoose');

const urlDb = process.env.URLDB

const connectUsingMongoose = async()=>{
  try{
      await mongoose.connect(urlDb);
      console.log("Mongodb connected using mongoose");
  }catch(err){
      console.log("Error while connecting to db");
      console.log(err);
  }
}

module.exports = connectUsingMongoose;




