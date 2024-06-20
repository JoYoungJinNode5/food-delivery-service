/**
 * createResponse
 * @param {number} status response 상태코드
 * @param {string} message response 메세지
 * @param {*} data response Data
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
