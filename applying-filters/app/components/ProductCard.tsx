import type { Product } from '../types/Product'

import Image from 'next/image'

import { Rating } from './Rating'

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md'>
      <a className='relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl' href='#'>
        <Image
          alt={product.title}
          className='h-full w-full object-cover'
          height={240}
          src={product.image}
          width={320}
        />
      </a>
      <div className='mt-4 px-5 pb-5'>
        <a href='#'>
          <h5 className='text-xl tracking-tight text-slate-900'>{product.title}</h5>
        </a>
        <div className='mb-5 mt-2 flex items-center justify-between'>
          <p>
            <span className='text-3xl font-bold text-slate-900'>${product.price}</span>
          </p>
          <Rating rate={product.rating.rate} showRate />
        </div>
        <a
          className='flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
          href='#'
        >
          <svg
            className='mr-2 h-6 w-6'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
          Add to cart
        </a>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: Product
}
