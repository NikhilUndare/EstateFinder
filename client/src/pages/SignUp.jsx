import {Link} from 'react-router-dom';

export default function SignUp() {
  return (
    <div className='  sm:max-w-lg bg-gradient-to-b from-slate-300  mt-12 p-5 mx-auto rounded-xl shadow-xl '>
       <h1 className='text-3xl text-slate-700 text-center font-bold my-6'>Sign Up</h1>
       <form className='flex flex-col gap-4'>
         <input type='text' placeholder='username' className='border p-3 rounded-lg ' id='username' /> 
         <input type='email' placeholder='email' className='border p-3 rounded-lg ' id='email' /> 
         <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' /> 
         <button  className= ' bg-slate-700 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80'>Sign up</button>
       </form>
       <div className='flex gap-3 mt-5' >
        <p > Already have an account? </p>
          <Link to={'/sign-in'}>
           <span className=' font-semibold text-slate-700 hover:text-slate-900 hover:underline'>SignIn</span>
          </Link>
        
       </div>
    </div>
  )
}
