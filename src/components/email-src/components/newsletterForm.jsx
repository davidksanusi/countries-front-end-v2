import { Input } from 'antd'
import Image from 'next/image'
import React from 'react'

function NewsletterForm() {
  return (
    <div className='w-[32rem] mx-auto p-5 mt-[40px] flex flex-col gap-[12px] bg-[#f7fafc] '><p className='text-2xl font-bold text-[#0D141C] text-center'>Get the latest news and updates from our community</p>
    <Input className='bg-[#E8EDF2] rounded-md h-[56px]' placeholder='Enter your email' variant='filled' suffix={<Image height={24} width={24} src={'/rightArrow.png'} alt=''/>}/>
    <p className='text-[#4F7596] text-sm font-normal text-center'>By entering your email, you agree to our Terms of Service and Privacy Policy</p>
    </div>
  )
}

export default NewsletterForm