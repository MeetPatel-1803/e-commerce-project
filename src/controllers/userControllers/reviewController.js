import { META_CODE } from '../../utils/constants.js';
import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData,
  successResponseWithoutData
} from '../../utils/response.js';
import { addProductReviewValidation } from '../../validations/reviewValidations.js';
import { Product } from '../../models/index.js';

/**
 * @route POST /api/products/:productId/review
 * @description Add a review for a product
 */
export const addProductReview = (req, res) => {
  try {
    const reqParam = req.body;
    addProductReviewValidation(reqParam, res, async (validate) => {
      const { productId } = req.params;

      const productDetails = await Product.findById(productId);
      if (!productDetails) {
        return errorResponseWithoutData(res, META_CODE.FAIL, res.__('productNotFound'));
      }

      const reviewAlreadyExist = productDetails.reviews.find((x) => x.userId === req.user.id);
      if (reviewAlreadyExist) {
        return successResponseWithoutData(res, META_CODE.SUCCESS, res.__('alreadyProductReviewed'));
      }

      const newReview = {
        userId: req.user.id,
        rating: reqParam.rating,
        comment: reqParam.comment
      };
      productDetails.reviews.push(newReview);

      productDetails.avgRating =
        productDetails.reviews.reduce((acc, review) => acc + review.rating, 0) /
        productDetails.reviews.length;

      await productDetails.save();
      return successResponseWithoutData(res, META_CODE.SUCCESS, res.__('productReviewAdded'));
    });
  } catch (error) {
    return internalServerErrorResponse(res);
  }
};

/**
 * @route GET /api/products/:productId/reviews
 * @description Get all reviews for a product
 */
export const getAllProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId).populate('reviews.user', 'name -_id');
    if (!product) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('productNotFound'));
    }

    return successResponseData(
      res,
      product.reviews,
      META_CODE.SUCCESS,
      res.__('allReviewsFetched')
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};

/**
 * @route DELETE /api/products/:productId/review/:reviewId.
 * @description Delete a review (Only the user who posted it).
 */
export const deleteProductReviews = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return errorResponseWithoutData(res, META_CODE.FAIL, res.__('productNotFound'));
    }

    const reviewIndex = product.reviews.findIndex(
      (x) => x._id.toString() === reviewId && x.userId === req.user._id
    );

    if (reviewIndex > -1) {
      product.reviews.splice(reviewIndex, 1);
    }

    if (product.reviews.length > 0) {
      product.averageRating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;
    } else {
      product.averageRating = 0;
    }

    await product.save();
    return successResponseWithoutData(res, META_CODE.SUCCESS, res.__('revireDeletedSuccessfully'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
};
