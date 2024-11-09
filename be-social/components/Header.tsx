import React from 'react'
import { TbSocial } from 'react-icons/tb'

const Header = () => {
  return (
    <header className='flex items-center p-2 shadow-md'>
        <h1 className="flex items-center text-2xl w-[300px] text-center"><span>BeSocial</span><TbSocial color="blue"/></h1>
        <input type="text"  placeholder="search" className="rounded-md px-4 py-2"/>


    </header>
  )
}

export default Header
