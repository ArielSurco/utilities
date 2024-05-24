'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { Rating } from './Rating'

export const RatingFilter = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const rateSearchParam = Number(searchParams.get('rating'))

  const [rate, setRate] = useState<number>(rateSearchParam || 0)

  const handleClickRate = (newRate: number) => {
    const newSearchParams = new URLSearchParams(searchParams)

    newSearchParams.set('rating', String(newRate))

    if (newRate === 1 && rateSearchParam === newRate) {
      newSearchParams.delete('rating')
      setRate(0)
    }

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <Rating
      onBlurRate={() => setRate(rateSearchParam)}
      onClickRate={handleClickRate}
      onHoverRate={(newRate) => setRate(newRate)}
      rate={rate}
    />
  )
}
