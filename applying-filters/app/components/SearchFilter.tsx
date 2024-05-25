'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const SearchFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState<string>(searchParams.get('search') ?? '')

  // Applying debounce effect
  useEffect(() => {
    const timerId = setTimeout(() => {
      const newSearchParams = new URLSearchParams(searchParams)

      newSearchParams.set('search', searchValue)

      router.push(`${pathname}?${newSearchParams.toString()}`)
    }, 500)

    return () => clearTimeout(timerId)
  }, [searchValue])

  return (
    <div className='w-full'>
      <input
        className='h-12 w-full rounded-md bg-gray-200 px-4 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder='Search for articles'
        type='text'
        value={searchValue}
      />
    </div>
  )
}
