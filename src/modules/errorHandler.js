import ERRORS from "../data/errors";

export default function errorHandler(error, withMessage = true) {
  if (Array.isArray(error)) {
    return serError(error[0]);
  }

  if (typeof error == typeof {}) {
    for (let key in error)
      error[key] = errorHandler(error[key], withMessage);

    return error;
  }

  return serError(error);

  function serError(index) {
    if (!index)
      return null;

    if (withMessage)
      return ERRORS[index] ? ERRORS[index].message : true;

    return true;
  }
}