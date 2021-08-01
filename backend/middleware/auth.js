const jwt = require("jsonwebtoken");
const User = require("../models/user");

const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const auth = async (req, res, next) => {
  try {
    const token = req.headers["X-AUTH-TOKEN"];
    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: [
          ReasonPhrases.UNAUTHORIZED,
          "Please Login first to access this endpoint!",
        ],
      });
    }

    const decodedData = jwt.verify(token, TOKEN_SECRET);

    const user = await User.findOne({ email: decodedData.email });
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: [
          ReasonPhrases.UNAUTHORIZED,
          "Please Login first to access this endpoint!",
        ],
      });
    }
    req.id = user._id;
    req.role = user.role;
    next();
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({
      error: [
        ReasonPhrases.UNAUTHORIZED,
        error,
        "Please Login first to access this endpoint!",
      ],
    });
  }
};

module.exports = auth;
