import { Cart, Product } from '../../models';
import { META_CODE } from '../../utils/constants.js';
import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData
} from '../../utils/response.js';

export const addItemToCart = async (req, res) => {
  try {
    const reqBody = req.body;
    const { productId, quantity } = reqBody;
    const userId = req.user.id;

    const product = await Product.findById(productId);
    if (!product) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Product not found'));
    }

    const cart = await Cart.findOneAndUpdate(
      { userId },
      {
        user: userId,
        items: []
      },
      { upsert: true, new: true }
    );

    const existingItem = cart.items.find((item) => item.product.toString() === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return successResponseData(
      res,
      cart,
      META_CODE.SUCCESS,
      res.__('Item added to cart successfully')
    );
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate(
      'items.product',
      'name price images'
    );

    if (!cart) return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Cart is empty'));

    return successResponseData(res, META_CODE.SUCCESS, cart, res.__('Cart fetched successfully'));
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const reqBody = req.body;
    const { productId, quantity } = reqBody;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Cart not found'));

    const item = cart.items.find((item) => item.product.toString() === productId);
    if (!item) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Item not found in cart'));
    }

    item.quantity = quantity;
    await cart.save();

    return successResponseData(res, cart, META_CODE.SUCCESS, res.__('Cart updated successfully'));
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Cart not found'));
    }

    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    await cart.save();

    return successResponseData(res, cart, META_CODE.SUCCESS, res.__('Item removed'));
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};
