var redis = require('redis');
const log = require("../utils/logger");
require('dotenv').config();
const {promisify} = require('util');

let redis_conf
const client = redis.createClient({
    host: process.env.redis_host,
    port: process.env.redis_port,
    password: process.env.redis_password
})
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.set).bind(client);

client.on('error', (err) => console.log('Redis Client Error', err));



var TOKEN_KEY = "TOKEN_"
var SESS_KEY = "SESS_ID_"

exports.setToken = async function (new_token, req, res) {
    if (typeof req.headers['authorization'] == "undefined") {
        log.info(req.headers, "Token Not found IN Headers " + res.uid, __FILE, __LINE, 5);
        return false;
    }
    key = TOKEN_KEY + req.headers['authorization'].replace(/[^a-z0-9]/gi, '')
    const reply = await SET_ASYNC(key, new_token, {'EX': process.env.token_expire});

    if (reply) {
        log.info("Reply\n", reply)
        log.info(reply, "Redis Status of Kye Set for Refresh Token  "+key);
    } else {
        return false;
    }
    return;
}
