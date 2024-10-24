import React from 'react'
import { GiSelfLove } from "react-icons/gi";
function NavBar() {
  return (
    <>
      <div className='max-w-screen-2xl mx-auto container md:px-40 shadow-md h-35 py-3 fixed'>
        <div className='flex justify-between'>
            <h1 className='flex text-3xl my-1 cursor-pointer font-bold'>I<span className='text-2xl py-2 text-red-700 stroke-2' ><GiSelfLove/></span>PDF</h1>
            {/* <h1 className='text-2xl cursor-pointer font-bold'>Word<span className='text-3xl text-green-600 '>To</span>Pdf</h1> */}
            <h1 className='text-3xl my-1 cursor-pointer font-bold hover:scale-150 duration-150'>Home</h1>
        </div>
      </div>
    </>
  )
}

export default NavBar