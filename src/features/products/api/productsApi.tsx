import { getProducts } from "../../../firebase/db/products";

export const downloadProducts = async () => {
    return getProducts();
}

export const downloadProductsWithDiscount = async () => {
    let productsWithDiscount = await getProducts();
  return productsWithDiscount.filter(item => item.discount != null);
};






