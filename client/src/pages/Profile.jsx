import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useRef } from 'react';
import { app } from '../firebase';
import {updateUserStart ,updateUserSuccess,updateUserfailure} from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

export default function Profile() {
  const { currentUser ,loading,error } = useSelector((state) => state.user)
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
        <button disabled={loading}  className=' bg-gradient-to-b from-slate-700 to-slate-500 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider '>
          { loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-5 mb-3 px-2'>
        <p className='font-semibold  text-red-600 hover:text-red-700 hover:underline '>Delete Account</p>
        <p className='font-semibold  text-red-600 hover:text-red-700 hover:underline '>Sign Out</p>
      </div>
      <p className=' text-red-600 mt-3 font-semibold text-center'>{error ? error : ""}</p>
    </div>
  )
}
