/**
 *
 * @param {*} status
 * @param {*} message
 * @param {*} data
 * @returns
 */
export const createResponse = (status, message, data) => {
  const response = {
    status,
    message,
  };
  if (data) response.data = data;

  return response;
};
