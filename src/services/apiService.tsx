import { read } from './httpService';

export async function apiGetAllProducts() {
  const allProducts = await read('/products?populate=*');
  return allProducts;
}

export async function apiFilterProductsByCategory(categoryName: string) {
  const categoryFilterProducts = await read(
    `/products?filters[categoria][categoryName][$eq]=${categoryName}&populate=*`
  );

  return categoryFilterProducts;
}

export async function apiGetSingleProduct(productId: any) {
  const singleProduct = await read(`/products/${productId}?populate=*`);
  return singleProduct;
}

export async function apiGetAllCategories() {
  const allCategories = await read('/categories?populate=*');
  return allCategories;
}
