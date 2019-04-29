import statusCodes from '../helpers/statusCodes';

/**
   * Check if user is a staff
   * @param {object} request express request object
   * @param {object} response express response object
   * @param {object} next express next object
   *
   * @returns {json} json
   */
export const staffRole = (request, response, next) => {
  const { isAdmin, type } = request.decode;
  if (!isAdmin && type === 'staff') {
    next();
  } else {
    return response.status(403).json({
      status: statusCodes.forbidden,
      error: 'Forbidden: Access is denied',
    });
  }
};

/**
   * Check if user is an admin
   * @param {object} request express request object
   * @param {object} response express response object
   * @param {object} next express next object
   *
   * @returns {json} json
   */
export const adminRole = (request, response, next) => {
  const { isAdmin, type } = request.decode;
  if (isAdmin && type === 'staff') {
    next();
  } else {
    return response.status(403).json({
      status: statusCodes.forbidden,
      error: 'Forbidden: Access is denied',
    });
  }
};

/**
   * Check if user is a staff or an admin
   * @param {object} request express request object
   * @param {object} response express response object
   * @param {object} next express next object
   *
   * @returns {json} json
   */
export const adminStaffRole = (request, response, next) => {
  const { isAdmin, type } = request.decode;
  if ((isAdmin && type === 'staff') || (!isAdmin && type === 'staff')) {
    next();
  } else {
    return response.status(403).json({
      status: statusCodes.forbidden,
      error: 'Forbidden: Access is denied',
    });
  }
};
