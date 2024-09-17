import React, { useEffect, useState } from 'react'
import { CiCircleRemove } from "react-icons/ci";
import { Link  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useRef } from 'react';
import { app } from '../firebase';
import {updateUserStart ,updateUserSuccess,updateUserfailure, 
   deleteUserStart , deleteUserSuccess , deleteUserFailure,
   signOutUserStart , signOutUserSuccess,signOutUserFailure
} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function Profile() {
  const { currentUser ,loading,error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [showListingError , setShowListingError] = useState(false);
  const [userListings ,setUserListings] = useState([]);
  const [deleteListingError , setDeletelistingError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        // console.log('Upload is ' + progress + ' % done')
        setFilePercent(Math.round(progress));

      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadUrl) => {
            setFormData({ ...formData, avatar: downloadUrl });
          })
      }
    );

  }

  const handleClick = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
     e.preventDefault();

     try {
       dispatch(updateUserStart());
       const res = await fetch(`/api/user/update/${currentUser._id}` , {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(formData)
       }) ;
       const data = await res.json();
       if(data.success == false){
         dispatch(updateUserfailure(data.message));
         return
       }
       dispatch(updateUserSuccess(data));
       toast.success("User updated succefully")

     } catch (error) {
      dispatch(updateUserfailure(error.message))
     }

  }

   const handleDelete = async () => {
      try {
         dispatch(deleteUserStart());
         const res = fetch(`/api/user/delete/${currentUser._id}`,{
           method : 'DELETE',
         })
         const data = (await res).json();
         if(data.success === false){
           dispatch(deleteUserFailure(data));
           return
         }
         dispatch(deleteUserSuccess());
         toast.success('User deleted successfully!')

      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
   }

   const handleSignOut = async() => {
      try {
        dispatch(signOutUserStart())
        const res = await fetch('/api/auth/signout');
        const data = res.json();
        if(data.success === false){
          dispatch(signOutUserFailure(data.message))
          return;
        }
        dispatch(signOutUserSuccess());
        toast.success("User has been logged out!")
       // navigator('/sign-in')
      } catch (error) {
        dispatch(signOutUserFailure(error.message))
      }
   }

    const handleShowListings = async() => {
       try {
        setShowListingError(false)
        const res = await fetch(`/api/user/listings/${currentUser._id}`);
        const data = await res.json();
        
        if(data.success === false){
          setShowListingError(true)
          return;
        }
        setUserListings(data)
       } catch (error) {
        setShowListingError(true)
       }
    }
   
    const handleDeleteListing = async (listingId) => {
       try {
         const res = await fetch(`/api/listing/delete/${listingId}`,{
          method : 'DELETE'
         })
         const data = await res.json();
         if(data.success === false){
          setDeletelistingError(true);
          return
         }
         setUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
         toast.success('Listing deleted Successfully!')
       } catch (error) {
        setDeletelistingError(true);
        console.log(error.message)
       }
    }

  return (
    <div className='  sm:max-w-xl bg-gradient-to-b from-slate-300  mt-4 px-5 py-2 mx-auto rounded-xl shadow-xl '>
      <h1 className='text-3xl text-slate-700 text-center font-bold my-2 tracking-wide'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden accept='image/*' />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full w-24 h-24 object-cover self-center' />

        <p className='self-center text-sm font-semibold'>
          {fileUploadError
            ?
            <span className='text-red-700'>Error Image Upload (image must be less than 2 mb) </span>
            : filePercent > 0 && filePercent < 100 ?
              <span className='text-slate-700'>{`Uploading ${filePercent} %`}</span>
              : filePercent == 100 ?
                <span className='text-green-700'>Image Uploaded Successfully !</span>
                : ""
          }
        </p>

        <input type='text' defaultValue={currentUser.username} placeholder='username' className='border p-3 rounded-lg ' id='username'  onChange={handleClick} />
        <input type='email' defaultValue={currentUser.email} placeholder='email' className='border p-3 rounded-lg ' id='email'  onChange={handleClick}/>
        <input type='password' placeholder='password' className='border p-3 rounded-lg ' id='password' onChange={handleClick} />
        <button disabled={loading}  className=' bg-gradient-to-b from-slate-800 to-slate-600 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider '>
          { loading ? 'Loading...' : 'Update'}
        </button>
        <Link to={'/create-listing'} className=' text-center bg-gradient-to-b from-green-800 to-green-600 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider '>Create Listing</Link>
      </form>
      <div className='flex justify-between mt-5 mb-3 px-2'>
        <p onClick={handleDelete} className='font-semibold  text-red-600 hover:text-red-700 cursor-pointer hover:underline '>Delete Account</p>
        <p onClick={handleSignOut} className='font-semibold  text-red-600 hover:text-red-700 cursor-pointer hover:underline '>Sign Out</p>
      </div>
      <p className=' text-red-600 mt-3 font-semibold text-center'>{error ? error : ""}</p>
      <button onClick={handleShowListings} className='w-full text-lg font-semibold  text-green-600 hover:text-green-700 cursor-pointer hover:underline '>Show Listings</button>
       { userListings && userListings.length > 0 &&  <div className='flex justify-end mt-2 px-5'>
        <CiCircleRemove onClick={() => setUserListings(false)} className='w-8 h-8 text-red-500 hover : shadow-2xl ' />
       </div> }
      <p className=' text-red-600 mt-3 font-semibold text-center'>{showListingError ? 'Error in showing Listings' : ''}</p>
      { userListings && userListings.length > 0 && 

        <div className=' flex flex-col gap-4'> 
          <div> 
            <h1 className='text-2xl font-semibold text-gray-700 text-center'>Your Listings</h1>
          </div>
          
           { 
          userListings.map((listing) => (
            <div key={listing._id} className='p-2 mb-2 flex gap-2 justify-between items-center border border-gray-300'> 
               <Link to={`/listing/${listing._id}`} >
                 <img className='w-20 h-20 object-contain ' src={listing.imageUrls[0]} alt='listing image' />
                </Link>
                <Link className='flex-1 ml-4' to={`/listing/${listing._id}`}>
                 <p className='font-semibold  text-gray-700   hover:underline'>{listing.name}</p>
                </Link>
                <div className='flex flex-col'> 
                <Link to={`/update-listing/${listing._id}`}>
                <button className='font-semibold uppercase  text-slate-600 hover:text-slate-700 cursor-pointer hover:underline '>Edit</button>
                </Link> 
                 <button onClick={() => handleDeleteListing(listing._id)} className='font-semibold uppercase text-red-600 hover:text-red-700 cursor-pointer hover:underline '>Delete</button>
                </div>
            </div>
          )) 
          } 
          {deleteListingError && 
          <p className=' text-red-600 mt-3 font-semibold text-center'>Failed to delete listing </p> }
          </div>
        
       }
    </div>
  )
}
