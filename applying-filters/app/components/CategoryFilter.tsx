'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categories: string[]
}

export const CategoryFilter = ({ categories }: CategoryFilterProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectCategory = (category: string) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('category', category)

    if (searchParams.get('category') === category) {
      newSearchParams.delete('category')
    }

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <div className='flex w-full flex-wrap gap-2'>
      {categories.map((category) => (
        <button
          className={`rounded-md px-4 py-2 transition-all hover:bg-gray-200 ${searchParams.get('category') === category ? 'bg-gray-200' : 'bg-gray-100'}`}
          key={category}
          onClick={() => selectCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
