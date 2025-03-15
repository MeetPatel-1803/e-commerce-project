import { Category } from '../models/index.js';
import { PRODUCT_CATEGORIES } from '../utils/constants.js';

export const run = () =>
  new Promise((resolve) => {
    (async () => {
      await Category.deleteMany({});
      const categoriesToSeed = Object.keys(PRODUCT_CATEGORIES).map((key) => ({
        name: PRODUCT_CATEGORIES[key].name,
        subcategories: PRODUCT_CATEGORIES[key].subcategories
      }));
      await Category.insertMany(categoriesToSeed);
      resolve(true);
    })();
  });
