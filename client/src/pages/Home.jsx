import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';


export const Home = () => {
  const [sellListings, setSellListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  console.log(offerListings)
  SwiperCore.use([Navigation]);
  // console.log(sellListings);
  // console.log(offerListings);
  // console.log(rentListings);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`);
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`);
        const data = await res.json();
        setRentListings(data);
        fetchSellListings();
      } catch (error) {
        console.log(error)
      }
    }

    const fetchSellListings = async () => {
      try {
        const res = await fetch(`/api/listing/get?type=sell&limit=4`);
        const data = await res.json();
        setSellListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings();
  }, [])


  return (
    <div>
      {/* top side */}
      <div className='bg-slate-800'>
        <div className=' text-white flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
          <h1 className='font-bold text-3xl lg:text-6xl'>
            EstateFinder makes it
            <br />
            easy for you to find
            <br />
            a perfect place
          </h1>

          <div className='text-xs md:text-lg md:tracking-wide flex flex-col flex-wrap '>
            Dive into the world of comfort and convenience as we connect you to the finest estate.
            <br />
            Ensuring a perfect gateway tailored to your prefrences.
          </div>
          <Link to={'/search'}>
            <button className='font-semibold px-3 py-2 rounded-md transition ease-in-out delay-150 bg-indigo-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-600 duration-150'>get Started</button>
          </Link>

        </div>
      </div>

      {/* swiper */}
      <div>

        {offerListings && offerListings.length > 0 &&
          <div>
            <Swiper navigation>
              {offerListings.map((listing) => (
                <SwiperSlide key={listing._id}>
                  <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: "cover" }}
                    className='h-[500px]' >
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        }

      </div>

      {/* listings */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings && offerListings.length > 0 &&
          (
            <div className='flex flex-col gap-4'>
              <div>
                <h2 className='text-3xl font-semibold text-slate-600'>Recent Offers</h2>
                <Link className='text-slate-700 font-semibold hover:underline hover:text-slate-800' to={'/search?offer=true'}>Show more offers</Link>
              </div>
              <div className=' flex flex-wrap gap-4 md:gap-6 lg:gap-8'>
                {
                  offerListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))
                }

              </div>

            </div>
          )
        }

        {
          rentListings && rentListings.length > 0 &&
          (
            <div className='flex flex-col gap-4'>
              <div>
                <h2 className='text-3xl font-semibold text-slate-600'>Recent Places for Rent</h2>
                <Link className='text-slate-700 font-semibold hover:underline hover:text-slate-800' to={'/search?type=rent'}>Show more places for rent</Link>
              </div>
              <div className=' flex flex-wrap gap-4 md:gap-6 lg:gap-8'>
                {
                  rentListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))
                }

              </div>

            </div>
          )
        }

        {
          sellListings && sellListings.length > 0 &&
          (
            <div className='flex flex-col gap-4'>
              <div>
                <h2 className='text-3xl font-semibold text-slate-600'>Recent Places for Sell</h2>
                <Link className='text-slate-700 font-semibold hover:underline hover:text-slate-800' to={'/search?type=sell'}>Show more places for sell</Link>
              </div>
              <div className=' flex flex-wrap gap-4 md:gap-6 lg:gap-8'>
                {
                  sellListings.map((listing) => (
                    <ListingCard key={listing._id} listing={listing} />
                  ))
                }

              </div>

            </div>
          )
        }
      </div>
      {/* Footer*/ }
      <Footer />
    </div>
  )
}
