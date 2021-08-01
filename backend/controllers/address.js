const Address = require("../models/address");
const User = require("../models/user");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

exports.addAddress = async (req, res) => {
  try {
    const { zipcode, state, street, landmark, city, phone, name } = req.body;

    if (phone.length !== 10) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [ReasonPhrases.BAD_REQUEST, "Invalid contact number!"],
      });
    }

    if (zipcode.length !== 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [ReasonPhrases.BAD_REQUEST, "Invalid Zip Code!"],
      });
    }
    const address = Address.create({
      zipcode: zipcode,
      state: state,
      street: street,
      landmark: landmark,
      city: city,
      phone: phone,
      name: name,
      user: req.id,
    });
    const user = await User.findOne({ _id: req.id });
    let result = await Address.findOne({
      zipcode: zipcode,
      state: state,
      street: street,
      landmark: landmark,
      city: city,
      phone: phone,
      name: name,
      user: req.id,
    });

    result.user = user;
    return res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
