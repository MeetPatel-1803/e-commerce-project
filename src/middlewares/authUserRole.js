import { RESPONSE_CODE } from '../utils/constants.js';
import { errorResponseWithoutData } from '../utils/response.js';

/**
 * @description This function is used for role authorizaiton
 * @param {*} roles
 * @returns
 */
export const userAuthRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponseWithoutData(res, RESPONSE_CODE.FORBIDDEN, res.__('accessDenied'));
    }
    next();
  };
};
