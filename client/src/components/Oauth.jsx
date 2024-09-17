import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import {signInSuccess  } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';



export default function Oauth() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth,provider);
           // console.log(result)

           const res = await fetch('/api/auth/google',{
             method : 'POST',
             headers : {
                'Content-Type' : 'application/json'
             },
             body : JSON.stringify({
               name : result.user.displayName,
               email : result.user.email,
               photo : result.user.photoURL
             })
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            toast.success("User Logged In Successfully!");
            navigate('/');


        } catch (error) {
            console.log('could not sign in with google',error)
        }
    } 
  return (
    <button onClick={handleGoogleClick} type='button' className='bg-gradient-to-b from-red-800 to-red-600 p-3 rounded-xl text-white hover:opacity-90 uppercase tracking-wider '>
        Continue with google
     </button>
  )
}
