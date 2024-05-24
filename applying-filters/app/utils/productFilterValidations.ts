import type { FilterValidation } from '../types/FilterValidation'
import type { Product } from '../types/Product'

type ProductValidation = FilterValidation<Product>

export const searchValidation =
  (searchValue?: string): ProductValidation =>
  (product) => {
    if (!searchValue) return true

    return product.title.toLowerCase().includes(searchValue.toLowerCase())
  }

export const priceValidation =
  (min: number, max: number): ProductValidation =>
  (product) => {
    const safeMin = !min || Number.isNaN(min) ? 0 : min
    const safeMax = !max || Number.isNaN(max) ? Number.MAX_SAFE_INTEGER : max

    return product.price >= safeMin && product.price <= safeMax
  }

export const ratingValidation =
  (rating: number): ProductValidation =>
  (product) => {
    const safeRating = !rating || Number.isNaN(rating) ? 0 : rating

    return Math.round(product.rating.rate) >= safeRating
  }

export const categoryValidation =
  (category?: string): ProductValidation =>
  (product) => {
    if (!category) return true

    return product.category === category
  }
