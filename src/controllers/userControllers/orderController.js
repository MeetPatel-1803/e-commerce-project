import { Cart, Order } from '../../models/index.js';
import { META_CODE, ORDER_STATUS } from '../../utils/constants.js';
import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData
} from '../../utils/response.js';

export const placeOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { shippingAddress, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'name price stock');

    if (!cart || cart.items.length === 0) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Cart is empty'));
    }

    // Calculate total amount & Prepare items
    let totalAmount = 0;
    const orderItems = cart.items.map((item) => {
      totalAmount += item.product.price * item.quantity;
      return {
        product: item.product._id,
        quantity: item.quantity,
        priceAtPurchase: item.product.price // Store product price at purchase time
      };
    });

    const newOrder = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod,
      orderStatus: ORDER_STATUS.PROCESSING
    });

    await newOrder.save();

    // Clear user's cart after placing order
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    return successResponseData(
      res,
      newOrder,
      META_CODE.SUCCESS,
      res.__('Order placed successfully')
    );
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await Order.find({ user: userId }).populate('items.product', 'name price');

    return successResponseData(
      res,
      orders,
      META_CODE.SUCCESS,
      res.__('User orders fetched successfully')
    );
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await Order.findById(orderId)
      .populate('user', 'name email')
      .populate('items.product', 'name price');

    if (!order) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('Order not found'));
    }

    return successResponseData(
      res,
      order,
      META_CODE.SUCCESS,
      res.__('Order details fetched successfully')
    );
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};
