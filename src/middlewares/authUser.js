import { User } from '../models/index.js';
import { decode, verifyUser } from '../services/jwtService.js';
import { RESPONSE_CODE } from '../utils/constants.js';
import { errorResponseWithoutData, internalServerErrorResponse } from '../utils/response.js';

/**
 * @description This function is used to validate user authorization
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns {*}
 */
export const userAuthToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.UNAUTHORIZED,
        res.__('authorizationError')
      );
    }
    const tokenData = await decode(token);
    if (!tokenData) {
      return errorResponseWithoutData(
        res,
        RESPONSE_CODE.UNAUTHORIZED,
        res.__('authorizationError')
      );
    }
    const decoded = await verifyUser(tokenData);
    if (decoded._id) {
      // const user = await User.findById({ _id: mongoose.Types.ObjectId(decode._id) });
      const user = await User.findById(decoded._id);
      req.user = user;
      next();
    } else {
      return errorResponseWithoutData(res, RESPONSE_CODE.UNAUTHORIZED, res.__('invalidToken'));
    }
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};
