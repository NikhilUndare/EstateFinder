import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user)
  return (
    <div className='  sm:max-w-xl bg-gradient-to-b from-slate-300  mt-4 px-5 py-2 mx-auto rounded-xl shadow-xl '>
      <h1 className='text-3xl text-slate-700 text-center font-bold my-2 tracking-wide'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt='profile' className='rounded-full w-24 h-24 object-cover self-center' />

        <input type='text' placeholder='username' className='border p-3 rounded-lg ' id='username' />
        <input type='email' placeholder='email' className='border p-3 rounded-lg ' id='email' />
        <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' />
        <button className=' bg-gradient-to-b from-slate-700 to-slate-500 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider '>
          update
        </button>
      </form>
      <div className='flex justify-between mt-5 mb-3 px-2'>
        <p className='font-semibold  text-red-600 hover:text-red-700 hover:underline '>Delete Account</p>
        <p className='font-semibold  text-red-600 hover:text-red-700 hover:underline '>Sign Out</p>
      </div>

    </div>
  )
}
