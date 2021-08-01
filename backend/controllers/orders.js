const Order = require("../models/order");
const Product = require("../models/product");
const Address = require("../models/address");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

exports.saveOrder = async (req, res) => {
  try {
    const { addressId, productId, quantity } = req.body;
    const address = Address.findById(addressId);
    const product = Product.findById(productId);
    if (!address) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [
          ReasonPhrases.BAD_REQUEST,
          `No Address found for ID ${addressId}`,
        ],
      });
    }
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [
          ReasonPhrases.BAD_REQUEST,
          `No Product found for ID -${productId}!`,
        ],
      });
    }
    if (product.available_items - quantity < 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [
          ReasonPhrases.BAD_REQUEST,
          `Product with ID - ${productId} is currently out of stock`,
        ],
      });
    }
    const response = Order.create({
      amount: product.price,
      product_id: productId,
      shipping_address_id: addressId,
      user_id: id,
    });
    const order = await Order.findOne({
      amount: product.price,
      product_id: productId,
      shipping_address_id: addressId,
      user_id: id,
    });
    return res.status(StatusCodes.OK).json({ result: order });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
