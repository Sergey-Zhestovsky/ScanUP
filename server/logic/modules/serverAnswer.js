let { ServerError, serverErrors: ERRORS } = require("../classes/ServerError");

function serverAnswer(error, result) {
  if (error instanceof ServerError)
    return { error, result };

  if (error)
    return {
      error: new ServerError({
        code: error.code ? error.code : null,
        name: error.name ? error.name : "Server error",
      }, error),
      result
    };

  return { error: null, result };
}

serverAnswer.default = function (promise, response) {
  promise
    .then(answer => response.send(serverAnswer(null, answer)))
    .catch(error => response.send(serverAnswer(error)));
};

serverAnswer.ERRORS = ERRORS;

module.exports = serverAnswer;