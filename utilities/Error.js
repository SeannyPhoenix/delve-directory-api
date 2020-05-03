class APIErrors {
  httpErrors = {
    400: Error("Bad Request"),
    401: Error("Unauthorized"),
    403: Error("Forbidden"),
    404: Error("Not Found")
  };

  logFile = `./server.log`;
  logTimeOptions = {
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

    console.log(message);
    // fs.appendFileSync(this.logFile, `Error on ${logTime}`);
    // fs.appendFileSync(this.logFile, `${message}\n\n`);

    console.log(
      `\n\n-----\nError occurred. See server.log for details\n-----\n\n`
    );
  }

  static throwError(status) {
    newError = httpErrors[status];
    newError.status = status;
    throw newError;
  }

  static handleErrors(error, res) {
    APIErrors.writeLog(error);

    if (!error.status) {
      error.status = 500;
    }
    res.status(error.status).json({
      status: error.status,
      error: error
    });
  }
}

module.exports = APIErrors;
