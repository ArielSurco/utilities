'use client'

import { type MouseEvent } from 'react'

interface RatingProps {
  onBlurRate?: () => void
  onClickRate?: (rate: number) => void
  onHoverRate?: (rate: number) => void
  rate: number
  showRate?: boolean
}

export const Rating = ({ rate, showRate, onClickRate, onHoverRate, onBlurRate }: RatingProps) => {
  const handleMouseEnter = (event: MouseEvent<SVGElement>) => {
    const dataRate = event.currentTarget.getAttribute('data-rate')

    onHoverRate?.(Number(dataRate))
  }

  const handleClickRate = (event: MouseEvent<SVGElement>) => {
    const dataRate = event.currentTarget.getAttribute('data-rate')

    if (dataRate) {
      const rate = Number(dataRate)

      onClickRate?.(rate)
    }
  }

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          aria-hidden='true'
          className={`h-5 w-5 ${index + 1 <= Math.round(rate) ? 'text-yellow-300' : 'text-gray-300'}`}
          data-rate={index + 1}
          fill='currentColor'
          key={index}
          onClick={handleClickRate}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={onBlurRate}
          style={{ cursor: onClickRate ? 'pointer' : 'default' }}
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ))}

      {showRate ? (
        <span className='ml-1 mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold'>
          {rate.toFixed(2)}
        </span>
      ) : null}
    </div>
  )
}
