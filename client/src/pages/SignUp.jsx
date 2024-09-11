import { useState } from 'react';
import { Link ,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  };
  //console.log(formData);

  const handleErrors = (e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      setError("*Kindly fill all details first");
      return false
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = handleErrors(e);

    if(check){
      try {
        setLoading(true);
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return
        }
        setLoading(false);
        setError(null);
        toast.success("User created successfully")
        navigate('/sign-in')
        // console.log(data)
      } catch (error) {
        
         setLoading(false);
         setError(error.message);
      }
    }
    
    
  }


  return (
    <div className='  sm:max-w-lg bg-gradient-to-b from-slate-300  mt-12 p-5 mx-auto rounded-xl shadow-xl '>
      <h1 className='text-3xl text-slate-700 text-center font-bold my-6'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username' className='border p-3 rounded-lg ' id='username' onChange={handleChange} />
        <input type='email' placeholder='email' className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
        <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
        <button disabled={loading} className=' bg-slate-700 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
      <div className='flex gap-3 mt-5' >
        <p > Already have an account? </p>
        <Link to={'/sign-in'}>
          <span className=' font-semibold text-slate-700 hover:text-slate-900 hover:underline'>Sign In</span>
        </Link>
        
      </div>
      {error && <p className='text-red-500 mt-3'>{error}</p>}
    </div>
  )
}
