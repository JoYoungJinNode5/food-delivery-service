/**
 * isEmpty - 빈 값 체크
 * @param {*} value
 * @returns
 */
export const isEmpty = (value) => {
  if (
    typeof value === 'undefined' ||
    value === null ||
    value === '' ||
    value === 'null' ||
    value.length === 0 ||
    (typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else return false;
};
