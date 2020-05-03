const fs = require("fs");

class Error {
  static httpErrors = {
    400: new Error("Bad Request"),
    401: new Error("Unauthorized"),
    403: new Error("Forbidden"),
    404: new Error("Not Found")
  };
  static logFile = `./server.log`;
  static logTimeOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };

  static writeLog(message) {
    let logTime = Intl.DateTimeFormat("default", this.logTimeOptions).format(
      Date.now()
    );

    fs.appendFileSync(Error.logFile, `Error at ${logTime}\n`);
    fs.appendFileSync(Error.logFile, `${message}\n\n`);

    console.log(
      `\n\n-----\nError occurred. See server.log for details\n-----\n\n`
    );
  }

  static throwError(status) {
    let newError = Error.httpErrors[status];
    newError.status = status;
    throw newError;
  }

  static handleErrors(error, res) {
    if (!error.status) {
      error.status = 500;
      Error.writeLog(error);
    }
    res.status(error.status).json({
      status: error.status,
      error: error
    });
  }
}

module.exports = Error;
