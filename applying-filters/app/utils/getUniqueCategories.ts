import type { Product } from '../types/Product'

export const getUniqueCategories = (products: Product[]) => {
  const categories = products.map((product) => product.category)

  return Array.from(new Set(categories))
}
