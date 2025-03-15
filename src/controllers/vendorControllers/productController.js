import {
  errorResponseWithoutData,
  internalServerErrorResponse,
  successResponseData,
  successResponseWithoutData
} from '../../utils/response.js';
import {
  addEditProductValidation,
  deleteProductValidation
} from '../../validations/productValidations.js';
import { Category, Product } from '../../models/index.js';
import { META_CODE, RESPONSE_CODE } from '../../utils/constants.js';
import pluralize from 'pluralize';

/**
 * @description This function is used to add / edit product details.
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const addEditProduct = async (req, res) => {
  try {
    const reqParam = req.body;
    addEditProductValidation(reqParam, res, async (validate) => {
      if (validate) {
        if (reqParam.productId) {
          const product = await Product.findById(reqParam.productId);
          if (!product) {
            return errorResponseWithoutData(res, META_CODE.FAIL, res.__('ProductNotFound'));
          }
          if (product.vendor.toString() !== req.user.id) {
            return errorResponseWithoutData(
              res,
              RESPONSE_CODE.UNAUTHORIZED,
              res.__('authorizationError')
            );
          }
          const updatedProduct = await Product.findOneAndUpdate(
            { _id: reqParam.productId },
            {
              name: reqParam.name,
              description: reqParam.description,
              price: reqParam.price,
              stock: reqParam.stock,
              category: reqParam.category,
              tags: reqParam.tags,
              images: reqParam.images
            },
            { new: true }
          );

          return successResponseData(
            res,
            updatedProduct,
            META_CODE.SUCCESS,
            res.__('productUpdatedSuccessfully')
          );
        } else {
          const slug = pluralize.singular(reqParam.category.toLowerCase().replace(/\s+/g, '-'));
          let categoryDetail = await Category.findOne({ slug });
          if (!categoryDetail) {
            categoryDetail = await Category.findOneAndUpdate(
              { slug },
              { name: pluralize.singular(reqParam.category), slug },
              { upsert: true, new: true }
            ).select('name slug _id');
          }

          const productDetails = await Product.findOne({
            vendor: req.user.id,
            name: { $regex: new RegExp(`^${reqParam.name}$`, 'i') }
          });
          if (productDetails) {
            return errorResponseWithoutData(res, META_CODE.FAIL, res.__('productAlreadyExist'));
          }

          const product = await Product.insertOne({
            name: reqParam.name,
            description: reqParam.description,
            price: reqParam.price,
            stock: reqParam.stock,
            category: categoryDetail._id,
            tags: reqParam.tags,
            images: reqParam.images,
            vendor: req.user.id
          });

          if (!product) {
            return internalServerErrorResponse(res);
          }
          return successResponseWithoutData(
            res,
            META_CODE.SUCCESS,
            res.__('productCreatedSuccessfully')
          );
        }
      }
    });
  } catch (err) {
    return internalServerErrorResponse(res);
  }
};

/**
 * @description This function is used to get all products.
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const getAllProducts = async (req, res) => {
  try {
    const productDetails = await Product.find()
      .populate('category', 'name -_id')
      .populate('vendor', 'name -_id')
      .exec();
    return successResponseData(
      res,
      productDetails,
      META_CODE.SUCCESS,
      res.__('productFetchedSuccessfully')
    );
  } catch (err) {
    return internalServerErrorResponse(res);
  }
};

/**
 * @description This function is used to delete product.
 * @param {*} req
 * @param {*} res
 * @returns {*}
 */
export const deleteProduct = async (req, res) => {
  try {
    const reqParam = req.body;
    deleteProductValidation(reqParam, res, async (validate) => {
      if (validate) {
        const product = await Product.findById(reqParam.productId);
        if (!product) {
          return errorResponseWithoutData(res, META_CODE.FAIL, res.__('productNotFound'));
        }
        await Product.findByIdAndDelete(reqParam.productId);
        return successResponseWithoutData(
          res,
          META_CODE.SUCCESS,
          res.__('productDeletedSuccessfully')
        );
      }
    });
  } catch (err) {
    return internalServerErrorResponse(res);
  }
};
