import ERRORS from "../data/errors";

export default function errorHandler(error) {
  if (Array.isArray(error)) {
    return serError(error[0]);
  }

  if (typeof error == typeof {}) {
    for (let key in error)
      error[key] = errorHandler(error[key]);

    return error;
  }

  return serError(error);

  function serError(index) {
    if (!index)
      return null;

    return ERRORS[index].message;
  }
}