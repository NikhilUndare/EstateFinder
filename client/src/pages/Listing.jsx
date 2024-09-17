import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaMapMarkerAlt, FaBath, FaBed, FaChair, FaParking } from "react-icons/fa";
import { useSelector } from 'react-redux';
import Contact from '../components/Contact';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [copied, setCopied] = useState(false);
    const [contact ,setContact] = useState(false);
    const { currentUser  } = useSelector((state) => state.user)
    //console.log(listing)
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true)
                const listingId = params.id;
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false)
                    return
                }
                setListing(data);
                setLoading(false)
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false)
            }

        }

        fetchListing();
    }, [])

    return (
        <main>
            {loading && <p className='text-center font-bold text-3xl mt-7'>Loading...</p>}
            {error && <p className='text-center font-bold text-3xl mt-7'>Something Went Wrong!</p>}
            {listing && !loading && !error &&
                <div>
                    <Swiper navigation >
                        {listing.imageUrls.map((url) => (

                            <SwiperSlide key={url}>
                                <div
                                    className=' h-[550px] '
                                    style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                                >

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare
                            className='text-slate-700'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false)
                                }, 2000)

                            }}
                        />
                    </div>
                    {copied && <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                        Link copied!
                    </p>}
                    <div className='flex flex-col max-w-4xl mx-auto my-7 p-3 gap-4'>
                        <p className='text-2xl font-semibold'>
                            {listing.name} - ₹{' '}
                            {listing.offer
                                ? listing.discountPrice.toLocaleString('en-IN')
                                : listing.regularPrice.toLocaleString('en-IN')
                            }
                            {listing.type === 'rent' && ' / month'}
                        </p>
                        <p className='flex gap-2 items-center text-slate-600  font-semibold mt-2'>
                            <FaMapMarkerAlt className='text-green-700' />
                            {listing.address}
                        </p>
                        <div className='flex gap-4'>
                            <p className='font-semibold bg-gradient-to-b from-red-800 to-red-600 w-full max-w-[200px] text-white rounded-md px-1 py-2 text-center'>
                                {listing.type === 'sell' ? 'For Sell' : 'For Rent'}
                            </p>
                            {listing.offer &&
                                <p className='font-semibold bg-gradient-to-b from-green-800 to-green-600 w-full max-w-[200px] text-white rounded-md px-1 py-2 text-center' >
                                    ₹ {+listing.regularPrice - +listing.discountPrice} discount
                                </p>}
                        </div>
                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>Description - </span>
                            {listing.description}
                        </p>
                        <ul className='flex  flex-wrap text-green-900 font-semibold gap-4 sm:gap-6'>
                            <li className='flex gap-2 items-center whitespace-nowrap'>
                                <FaBed className='text-lg' />
                                {listing.bedrooms > 1
                                    ? `${listing.bedrooms} beds`
                                    : `${listing.bedrooms} bed`
                                }
                            </li>
                            <li className='flex gap-2 items-center whitespace-nowrap'>
                                <FaBath className='text-lg' />
                                {listing.bathrooms > 1
                                    ? `${listing.bathrooms} baths`
                                    : `${listing.bathrooms} bath`
                                }
                            </li >
                            <li className='flex gap-2 items-center whitespace-nowrap'>
                                <FaParking className='text-lg' />
                                {listing.parking
                                    ? 'Parking Spot'
                                    : 'No Parking'
                                }
                            </li>
                            <li className='flex gap-2 items-center whitespace-nowrap'>
                                <FaChair className='text-lg' />
                                {listing.furnished
                                    ? 'Furnished'
                                    : 'Unfurnished'
                                }
                            </li>
                        </ul>
                        { currentUser && listing.userRef !== currentUser._id && !contact && (

                        <button onClick={()=> setContact(true)} className=' bg-gradient-to-b from-slate-800 to-slate-600 p-3 mt-6 rounded-xl  text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider'>
                           Contact Landlord 
                        </button>
                        ) }
                        {contact && <Contact listing={listing} />}
                    </div>
                </div>
            }

        </main>
    )
}
