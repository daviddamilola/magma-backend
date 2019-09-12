import models from '../database/models';
import Responses from '../utils/Responses';
import Helper from '../utils/Helper';

/**
 * @function
 * @description Check if email is already exists
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */


const emailExists = async (req, res, next) => {
  const { email } = req.body;
  const check = await models.User.findOne({ where: { email } });
  if (check) {
    Responses.setError(409, 'email already in use');
    return Responses.send(res);
  }
  next();
};

/**
 * @function
 * @description Check if user email exist, password correct and verified
 * @param {object} req - Resquest object
 * @param {object} res - Response object
 * @param {object} next
 * @returns {object} JSON response
 */
const validateLogin = (req, res, next) => {
  let { email } = req.body;
  const { password } = req.body;
  email = email.trim().toLowerCase();
  models.User.findOne({ where: { email } }).then(response => {
    if (!response) {
      Responses.setError(404, 'Your email cannot be found in our database.');
      return Responses.send(res);
    }
    const correctPassword = Helper.comparePassword(password, response.password);
    if (!correctPassword) {
      Responses.setError(401, 'Your password is incorrect.');
      return Responses.send(res);
    }
    if (response.isVerified === false) {
      Responses.setError(401, 'Your email is not verified.');
      return Responses.send(res);
    }
    next();
  });
};

export default {
  emailExists, validateLogin
};
