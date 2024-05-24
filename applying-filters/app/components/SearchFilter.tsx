'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent } from 'react'

export const SearchFilter = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('search', event.target.value)

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <div className='w-full'>
      <input
        className='h-12 w-full rounded-md bg-gray-200 px-4 font-medium placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600'
        onChange={handleChange}
        placeholder='Search for articles'
        type='text'
        value={searchParams.get('search') ?? ''}
      />
    </div>
  )
}
