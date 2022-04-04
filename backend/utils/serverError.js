class ServerError extends Error {
  constructor(code, message) {
    super(message);
    this.statusCode = code;
    this.statusMessage = message;
  }
}

module.exports = ServerError;
