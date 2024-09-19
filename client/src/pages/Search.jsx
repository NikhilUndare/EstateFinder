import React from 'react'

export default function Search() {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Serach Term :</label>
                        <input type='text' id='serachTerm' placeholder='Search...'
                            className='border p-3 w-full rounded-lg' />
                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <label className='font-semibold'>Type :</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='all' className='w-5' />
                            <span> Rent & Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span> Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-5' />
                            <span>Sell </span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>

                    </div>
                    <div className='flex flex-wrap items-center gap-4'>
                        <label className='font-semibold'>Amenities :</label>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span> Parking</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort :</label>
                        <select id='sort_order' className='border rounded-lg p-3'>
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                    <button className=' bg-gradient-to-b from-slate-800 to-slate-600 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider'>
                        Search
                    </button>
                </form>
            </div>
            <div className='p-4'>
                <h1 className='text-3xl text-slate-700 text-center font-semibold my-4  tracking-wide'>  Listing Results :</h1>
            </div>
        </div>
    )
}
