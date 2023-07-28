import { read } from "./httpService";

export async function apiGetAllProducts() {
  const allProducts = await read("/products?populate=*");
  return allProducts;
}

export async function apiGetSingleProduct(productId: any) {
  const singleProduct = await read(`/products/${productId}?populate=*`);
  return singleProduct;
}
