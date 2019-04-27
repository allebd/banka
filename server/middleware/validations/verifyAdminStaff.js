/* eslint-disable consistent-return */
/**
   * verifies admin user
   * @param {object} request express request object
   * @param {object} response express response object
   * @param {object} next express next object
   *
   * @returns {json} json
   */
import statusCodes from '../../helpers/statusCodes';

const verifyAdminStaff = (request, response, next) => {
  const { isAdmin, type } = request.decode;
  if ((isAdmin && type === 'staff') || (!isAdmin && type === 'staff')) {
    next();
  } else {
    return response.status(401).json({
      status: statusCodes.unAuthorized,
      error: 'You are not authorized',
    });
  }
};

export default verifyAdminStaff;
