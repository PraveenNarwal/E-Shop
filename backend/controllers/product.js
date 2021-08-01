const Product = require("../models/product");
const { ReasonPhrases, StatusCodes } = require("http-status-codes");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    products.sort((a, b) => (a.name > b.name ? 1 : -1));

    return res.status(StatusCodes.OK).json({ result: products });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.getProductsCatagories = async (req, res) => {
  try {
    const products = await Product.find({});
    const result = new Set();
    products.map((obj) => {
      return result.add(obj.catagories);
    });
    result.sort();
    return res.status(StatusCodes.OK).json({ result: result });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.getProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });
    return res.status(StatusCodes.OK).json({ result: product });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.saveProducts = async (req, res) => {
  try {
    const {
      available_items,
      category,
      description,
      image_url,
      manufacturer,
      name,
      price,
    } = req.body;
    const result = new Product({
      available_items: available_items,
      catagory: category,
      description: description,
      image_url: image_url,
      manufacturer: manufacturer,
      name: name,
      price: price,
    });
    const product = Product.findOne({
      available_items: available_items,
      catagory: category,
      description: description,
      image_url: image_url,
      manufacturer: manufacturer,
      name: name,
      price: price,
    });
    result.save();
    console.log(result, "created to db");
    return res.status(StatusCodes.OK).json({ result: product });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      available_items,
      catagory,
      description,
      image_url,
      manufacturer,
      name,
      price,
    } = req.body;
    const product = Product.findOne({ _id: id });
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [ReasonPhrases.BAD_REQUEST, `No Product Found for Id-${id}`],
      });
    }
    Product.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          available_items: available_items,
          catagory: catagory,
          description: description,
          image_url: image_url,
          manufacturer: manufacturer,
          name: name,
          price: price,
        },
      },
      { new: true, useFindAndModify: false },
      (err, data) => {
        if (err) {
          return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
        } else {
          return res.status(StatusCodes.OK).json({ result: data });
        }
      }
    );
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = Product.findOne({ _id: id });
    if (!product) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: [ReasonPhrases.BAD_REQUEST, `No Product Found for Id-${id}`],
      });
    }
    User.findByIdAndDelete(id, (err, r) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ error: ReasonPhrases.BAD_REQUEST });
      } else {
        return res.status(StatusCodes.OK).json({
          message: [
            ReasonPhrases.OK,
            `Product with ID - ${id} deleted successfully!`,
          ],
        });
      }
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: ReasonPhrases.INTERNAL_SERVER_ERROR });
  }
};
