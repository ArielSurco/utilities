'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type ChangeEvent, useState } from 'react'

export const PriceFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const minSearchParam = Number(searchParams.get('min'))
  const maxSearchParam = Number(searchParams.get('max'))

  const [minValue, setMinValue] = useState<number>(minSearchParam || 0)
  const [maxValue, setMaxValue] = useState<number>(maxSearchParam || 0)
  const [hasChanged, setHasChanged] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValue = Number(value)

    if (Number.isNaN(newValue)) return

    setHasChanged(true)

    if (name === 'min') {
      setMinValue(newValue)
    }

    if (name === 'max') {
      setMaxValue(newValue)
    }
  }

  const handleClick = () => {
    const newSearchParams = new URLSearchParams(searchParams)

    if (minValue) {
      newSearchParams.set('min', String(minValue))
    } else {
      newSearchParams.delete('min')
    }

    if (maxValue) {
      newSearchParams.set('max', String(maxValue))
    } else {
      newSearchParams.delete('max')
    }

    router.push(`${pathname}?${newSearchParams.toString()}`)
    setHasChanged(false)
  }

  return (
    <div className='flex w-fit items-center gap-2'>
      <input
        className='peer w-16 appearance-none rounded-lg border border-gray-300 bg-transparent p-2 text-sm text-gray-900 focus:border-2 focus:border-blue-600 focus:outline-none focus:ring-0'
        name='min'
        onChange={handleChange}
        pattern='[0-9]*'
        placeholder='Min'
        type='text'
        value={minValue || ''}
      />
      <input
        className='peer w-16 appearance-none rounded-lg border border-gray-300 bg-transparent p-2 text-sm text-gray-900 focus:border-2 focus:border-blue-600 focus:outline-none focus:ring-0'
        name='max'
        onChange={handleChange}
        pattern='[0-9]*'
        placeholder='Max'
        type='text'
        value={maxValue || ''}
      />
      <button
        className='grid h-6 w-6 place-items-center rounded-full bg-[#3483fa] text-white disabled:bg-[#e0e0e0]'
        disabled={!hasChanged}
        onClick={handleClick}
      >
        <svg aria-hidden='true' fill='currentColor' height='20' viewBox='0 0 20 20' width='20'>
          <path
            d='M8.27686 4.34644L7.42834 5.19496L12.224 9.99059L7.42334 14.7912L8.27187 15.6397L13.921 9.99059L8.27686 4.34644Z'
            fill='currentColor'
          />
        </svg>
      </button>
    </div>
  )
}
