const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

const validateAndDecodeToken = (token) => {
  if (!token) {
    throw new AuthenticationError("Token no proporcionado.");
  }

  try {
    const decode = jwt.decode(token);
    if (decode === null) {
      return new AuthenticationError("Token invalido.");
    }
    return decode;
  } catch (error) {
    console.log("Error: ", error)
    return new AuthenticationError("Token invalido.");
  }
};

module.exports = validateAndDecodeToken;
