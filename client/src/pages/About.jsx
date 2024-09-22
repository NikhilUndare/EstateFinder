import React from 'react'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
export default function About() {
  return (
    <div>
      <section className=" py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
            <p className="mt-4 text-lg text-gray-500">
              Welcome to <span className='text-xl font-semibold'>EstateFinder</span> , a platform designed to simplify your property search. We connect you with the best properties in India, providing a seamless experience for buyers, sellers, and renters alike.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">Our Mission</h2>
            <p className="mt-4 text-center text-gray-500">
              Our goal is to make the real estate process transparent, accessible, and user-friendly. Whether you are looking to buy, sell, or rent, we aim to offer an effortless and reliable experience through our app.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-6 bg-gradient-to-b from-slate-400 to-slate-200 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900">Expert Listings</h3>
              <p className="mt-4 text-gray-500">
                We curate the best properties in your area with detailed listings, ensuring you find exactly what you’re looking for.
              </p>
            </div>

            <div className="p-6 bg-gradient-to-b from-slate-400 to-slate-200 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold text-gray-900">Trusted Agents</h3>
              <p className="mt-4 text-gray-500">
                Our platform connects you with certified, trusted agents to guide you every step of the way.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
            <p className="mt-4 text-gray-500">
              Have questions? Feel free to <Link to={`mailto:whodrax321@gmail.com?subject=Regarding Estate details &body=`} className="text-blue-500 font-semibold hover:underline">reach out to us</Link>.
            </p>
          </div>
        </div>

      </section>
      <Footer />
    </div>

  )
}
