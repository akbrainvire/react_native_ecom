export const fetchProductsApi = async (categoryName: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/category/${categoryName}`,
  );
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  const data = await response.json();
  return data.products;
};
