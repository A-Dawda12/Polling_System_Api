const axios = require('axios').default;
const log = require("../utils/logger");
const moment = require("moment");
require('dotenv').config();
const https = require('https');

async function getUser(headersData) {
  	try {
		
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': headersData.authorization,
			'channelid': headersData.channelid
		  }
		  const body = {

		  }
    		const response = await axios.post(`${process.env.WHITELIST_ENDPOINT}/getuser`,{}, {
				headers: headers
			  });
		return response;
    } catch (error) {
    		log.error(error);
			if(error.response !== undefined) {
				error.statusCode = error.response.status;
				error.status = error.response.status;
				error.message = "Session timed out!";
				error.stack = error.response.data;
			}
			throw error;
  	}
}

async function getRefreshToken(token) {
	try {
	  const headers = {
			'Content-Type': 'application/x-www-form-urlencoded',
			'X-Requested-With': 'XMLHttpRequest',
			'UTCminutes': '330',
			'Origin': process.env.cmp_refresh_token_origin, // 'https://cmpweb.bss.sit.jio.com:7010'
		}
		  const response = await axios.postForm(`${process.env.cmp_refresh_token_url}`,{'refreshToken': token }, {
			  headers: headers
			});
	  return response;
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

module.exports = {
	getUser, 
	getRefreshToken
}