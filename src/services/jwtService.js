import Jwt from 'jsonwebtoken';

/**
 * @description This function is used to decode token from header
 * @param {*} token
 * @returns {*}
 */
export const decode = (token) => {
  const parts = token.split(' ');
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }

    return false;
  }

  return false;
};

/**
 * @description This function is used to verify user token
 * @param {*} token
 * @param {*} callback
 * @returns {*}
 */
export const verifyUser = (token) => {
  try {
    return Jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return false;
  }
};
