import { FaSearch } from 'react-icons/fa'
import { Link ,useNavigate } from 'react-router-dom'
import {  useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export default function Header() {
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) => state.user)
    const [searchTerm , setSearchTerm] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm' , searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`);
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if(searchTermFromUrl){
            setSearchTerm(searchTermFromUrl);
        }
    },[location.search])

    return (
        <header className='bg-gradient-to-b from-slate-400 to-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                        <span className='text-slate-500'>Estate</span>
                        <span className='text-slate-700'>Finder</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 py-2 px-6 rounded-xl flex items-center '>
                    <input 
                     type='text'
                     placeholder='Search... '
                     value={searchTerm}
                     onChange={(e) => setSearchTerm(e.target.value)}
                     className='bg-transparent focus:outline-none w-20 sm:w-40 lg:w-64' />
                     <button>
                      <FaSearch className='text-slate-600' />
                     </button>
                </form>
                <ul className='flex gap-6 font-medium'>
                    <Link to="/" > <li className=' text-gray-600 hover:text-gray-900 hover:underline hidden sm:inline'>HOME</li></Link>
                    <Link to="/about"> <li className=' text-gray-600 hover:text-gray-900 hover:underline hidden sm:inline'>ABOUT</li></Link>
                    <Link to="/profile"> 
                    { currentUser ? 
                       <img className='rounded-full w-8 h-8 object-cover' src={currentUser.avatar} alt='profile'/> 
                      : <li className=' text-gray-600 hover:text-gray-900 hover:underline'>SIGNIN</li>  }
                    
                     </Link>
                </ul>
            </div>
        </header>
    )
}
