import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'


export default function Header() {
    return (
        <header className='bg-gradient-to-b from-slate-400 to-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
                <Link to="/">
                    <h1 className='font-bold text-sm sm:text-3xl flex flex-wrap'>
                        <span className='text-slate-500'>Estate</span>
                        <span className='text-slate-700'>Finder</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 py-2 px-6 rounded-xl flex items-center '>
                    <input type='text' placeholder='Search... ' className='bg-transparent focus:outline-none w-20 sm:w-40 lg:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-6 font-medium'>
                    <Link to="/" > <li className=' text-gray-600 hover:text-gray-900 hover:underline hidden sm:inline'>HOME</li></Link>
                    <Link to="/about"> <li className=' text-gray-600 hover:text-gray-900 hover:underline hidden sm:inline'>ABOUT</li></Link>
                    <Link to="/sign-in"> <li className=' text-gray-600 hover:text-gray-900 hover:underline'>SIGNIN</li></Link>
                </ul>
            </div>
        </header>
    )
}
