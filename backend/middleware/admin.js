const { ReasonPhrases, StatusCodes } = require("http-status-codes");

const admin = async (req, res, next) => {
  if (!req.role) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: [
        ReasonPhrases.UNAUTHORIZED,
        "Please Login first to access this endpoint!",
      ],
    });
  }
  if (req.role !== "ADMIN") {
    return res.status(StatusCodes.FORBIDDEN).json({
      message: [
        ReasonPhrases.FORBIDDEN,
        "You are not authorized to access this endpoint!",
      ],
    });
  }
  next();
};

module.exports = admin;
