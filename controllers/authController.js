// const { promisify } = require("util");
// const jwt = require("jsonwebtoken");
// const User = require("../models/userModel");
// const AppError = require("../utils/appError");
// const restService = require("../utils/restServices");
// const log = require("../utils/logger");

// exports.protect = async (req, res, next) => {
// 	try {
// 		// 1) Verify token
// 		var decode = await restService.getUser(req.headers);
// 		log.info(decode);
// 		if(decode.response !== undefined && decode.response.status !== 200) {
// 			return res.status(decode.response.status).json(decode.response.data);
// 		}

// 		// 2) check if the user is exist (not deleted)
// 		const userResponse = await User.findLoggedInUser(decode.data.username);

// 		log.info(userResponse);
// 		log.info(__filename);
// 		log.info(userResponse);

// 		if (userResponse.status === "error") {
// 			return res.status(401).json(userResponse);
// 		}

// 		req.user = userResponse.data;
// 		next();
// 	} catch (err) {
// 		next(err);
// 	}
// };

// exports.permissions = async (req, res, next) => {
// 	try {
//         const roles = req.user.roles;
//         const permissions = req.user.permissions;
	
// 		log.info(__filename);
// 		log.info(JSON.stringify(req.user));


//         if (!permissions) {
//             return next(new AppError(404, 'fail', 'No permissions assigned to this user'), req, res, next);
//         }

//         res.status(200).json({
//             status: 'success',
//             data: {
// 				roles,
//                 permissions
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// exports.roles = async (req, res, next) => {
// 	try {
//         const roles = req.user.roles;

//         if (!roles) {
//             return next(new AppError(404, 'fail', 'No roles assigned to this user'), req, res, next);
//         }

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 roles
//             }
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// // Authorization check if the user have rights to do this action
// exports.restrictTo = (...roles) => {
// 	return (req, res, next) => {
// 		if (!roles.includes(req.user.roles)) {
// 			return next(
// 				new AppError(403, "fail", "You are not allowed to do this action"),
// 				req,
// 				res,
// 				next,
// 			);
// 		}
// 		next();
// 	};
// };
