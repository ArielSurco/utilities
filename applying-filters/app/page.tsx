import { CategoryFilter } from './components/CategoryFilter'
import { PriceFilter } from './components/PriceFilter'
import { ProductCard } from './components/ProductCard'
import { RatingFilter } from './components/RatingFilter'
import { SearchFilter } from './components/SearchFilter'
import { productsMock } from './mock/products'
import { applyFilters } from './utils/applyFilters'
import { getUniqueCategories } from './utils/getUniqueCategories'
import {
  categoryValidation,
  priceValidation,
  ratingValidation,
  searchValidation,
} from './utils/productFilterValidations'

interface HomeProps {
  searchParams: Partial<Record<'search' | 'min' | 'max' | 'rating' | 'category', string>>
}

export default function Home({ searchParams }: HomeProps) {
  const products = productsMock

  const filteredProducts = applyFilters(products, [
    searchValidation(searchParams.search),
    priceValidation(Number(searchParams.min), Number(searchParams.max)),
    ratingValidation(Number(searchParams.rating)),
    categoryValidation(searchParams.category),
  ])

  return (
    <main className='flex flex-col gap-4 p-10'>
      {/* FILTERS */}
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2'>
          <SearchFilter />
          <PriceFilter />
          <RatingFilter />
        </div>

        <CategoryFilter categories={getUniqueCategories(products)} />
      </div>

      {/* PRODUCTS LIST */}
      <div className='m-auto grid w-[1328px] grid-cols-4 gap-4'>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
