import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div>
      <div className='border border-gray-400 flex flex-col sm:flex-row'>
        <div className='flex flex-col w-full sm:w-1/2 py-10 sm:py-0  text-[#414141] items-center justify-center'>
            <div className='flex items-center gap-2'>
                <p className=' h-[2px] w-8 md:w-11 bg-[#414141]'></p>
                <p className='font-meddium text-sm md:text-base'>OUR BESTSELLLERS</p>
            </div>
            <div>
                <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
            </div>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md: text-base'>SHOP NOW</p>
            <p className=' h-[2px] w-8 md:w-11 bg-[#414141]'></p>
            </div>
        </div>
        <img src={assets.hero_img} className='w-full sm:w-1/2' alt="Hero" />
      </div>
    </div>
  )
}

export default Hero
