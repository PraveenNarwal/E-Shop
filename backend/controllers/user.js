const User = require("../models/user");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;

    // const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // if (!emailRegex.test(email)) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     error: [ReasonPhrases.BAD_REQUEST, "Please enter a valid email!"],
    //   });
    // }

    // if (phone_number.length !== 10) {
    //   return res.status(StatusCodes.BAD_REQUEST).json({
    //     error: [ReasonPhrases.BAD_REQUEST, "Invalid contact number!"],
    //   });
    // }

    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [
          ReasonPhrases.BAD_REQUEST,
          "Try any other email, this email is already registered!",
        ],
      });
    }
    User.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone_number: phone_number,
      password: password,
      role: "ADMIN",
    });

    const result = await User.findOne({ email: email });
    return res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: [ReasonPhrases.FORBIDDEN, "Invalid Credentials"] });
      return;
    }
    const valid_password = user.comparePassword(password);
    if (!valid_password) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: [ReasonPhrases.FORBIDDEN, "Invalid Credentials"] });
    }
    const today = new Date();
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
        createdAt: today,
      },
      process.env.token_secret,
      {
        expiresIn: process.env.expiration,
      }
    );
    return res.status(StatusCodes.OK).json({
      message: ReasonPhrases.OK,
      token: token,
      result: {
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
        isAuthenticated: true,
      },
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
