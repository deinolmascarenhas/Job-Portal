import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20'>
            <img className='w-40' src={assets.logo} alt="" />
            <p className='flex-1 pl-6 text-sm text-gray-500 max-sm:hidden'>
                | All rights reserved. Copyright @job-portal
            </p>        
            <div className='flex gap-2'>
                <img className='w-8' src={assets.facebook_icon} alt="" />
                <img className='w-8' src={assets.twitter_icon} alt="" />
                <img className='w-8' src={assets.instagram_icon} alt="" />
            </div>
        </div>
    )
}

export default Footer