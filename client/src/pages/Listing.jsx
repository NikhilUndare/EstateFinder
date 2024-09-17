import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper ,SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    console.log(listing)
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
                            style={{ background : `url(${url}) center no-repeat` ,backgroundSize : 'cover'  }}
                          >

                          </div>
                       </SwiperSlide>
                  ))}
                </Swiper>
             </div>
            }

        </main>
    )
}
