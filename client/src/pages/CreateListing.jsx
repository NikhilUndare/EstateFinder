import React, { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function CreateListing() {

    const [files,setfiles] = useState([]);
    const [formData,setFormData] = useState({
        imageUrls : [],
    })
    const[imageUploadError,setImageUploadError] = useState(false);
    const [uploading,setUploading] = useState(false);
    console.log(formData);
  
    const handleImageSubmit =(e) =>{     
       if(files.length < 1){
        setImageUploadError("choose atleast 1 image")
       }

       else if(files.length > 0 && files.length + formData.imageUrls.length < 7){
         setUploading(true);
         setImageUploadError(false);
        const promises = [];
         
         for(let i = 0 ; i < files.length ; i++){
            promises.push(storeImage(files[i]));  
         }
         Promise.all(promises).then((urls) => {
             setFormData({...formData , imageUrls : formData.imageUrls.concat(urls)});
            setImageUploadError(false)
            setUploading(false)
         }).catch((err) => {
            setImageUploadError('Image upload Failed (2 mb max per image)')
            setUploading(false)
         })

       }else{
        setImageUploadError('You can only upload 6 images per listing')
        setUploading(false)
       }
    }

    const storeImage = async(file) => {
       return new Promise((resolve,reject) => {
          const storage = getStorage(app);
          const fileName =  new Date().getTime() + file.name;
          const storageRef = ref(storage,fileName);
          const uploadTask = uploadBytesResumable(storageRef,file);
          uploadTask.on('state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress)
            },
            (error) => {
                reject(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downLoadURL) => {
                    resolve(downLoadURL);
                })
            }
          )
       })
    }

    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls : formData.imageUrls.filter((_,i) => i !== index)
      })
    }

    return (
        <main className=' mt-2 px-6 pt-2 pb-4 max-w-5xl mx-auto bg-gradient-to-b from-slate-300 rounded-xl shadow-2xl'>
            <p className='text-3xl text-slate-700 text-center font-bold mt-2 mb-6 tracking-wide'>Create Listing</p>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='Name' id='name' maxLength='62' minLength='10' required
                        className='border p-3 rounded-lg' />
                    <textarea type='text' placeholder='Description' id='description' required
                        className='border p-3 rounded-lg' />
                    <input type='text' placeholder='Address' id='address' required
                        className='border p-3 rounded-lg' />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='sell' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='parking' className='w-5' />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type='checkbox' id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bedrooms' min='1' max='10' required
                             className='p-3 border border-gray-300 rounded-lg' />
                             <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='bathrooms' min='1' max='10' required
                             className='p-3 border border-gray-300 rounded-lg' />
                             <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='regularPrice' min='1' required
                             className='p-3 border border-gray-300 rounded-lg' />
                             <div className='flex flex-col items-center'>
                             <p>Regular Price </p>
                             <span className='text-xs'>( ₹ / Month)</span>
                             </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='number' id='discountPrice' min='1'  required
                             className='p-3 border border-gray-300 rounded-lg' />
                             <div className='flex flex-col items-center'>
                             <p>Discounted Price  </p>
                             <span className='text-xs'>( ₹ / Month)</span>
                             </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold '>Images: 
                        <span className='font-normal text-gray-600 ml-2 '>The first image will be the cover (max 6)</span>
                    </p>
                   <div className='flex gap-4'>
                     <input
                      onChange={(e)=> setfiles(e.target.files) }
                      type='file' id='images' accept='image/*' multiple 
                      className='p-3 border border-gray-400 rounded w-full' 
                      />

                      <button  
                       onClick={handleImageSubmit}
                       type='button'
                       disabled={uploading}
                       className=' p-3 border border-green-700 text-green-600 uppercase rounded hover:shadow-xl disabled:opacity-80'>
                        {uploading ? 'Uploading...' : 'Upload'}</button>
                   </div>
                    <p className='text-red-700 text-center font-medium'>{imageUploadError &&`* ${imageUploadError}` }</p>
                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                        <div key={url} className='flex justify-between p-3 border border-gray-400 items-center'>
                            <img  src={url} ult='imageUrl' className='w-20 h-20 object-cover rounded' />
                            <button 
                             onClick={() => handleRemoveImage(index)}
                             type='button'
                            className='p-3 text-red-700 border border-red-500 rounded-md hover:shadow-xl uppercase'>delete</button>
                        </div>
                    ))}
                   <button  className=' bg-gradient-to-b from-slate-700 to-slate-500 p-3 rounded-xl text-white hover:opacity-90 uppercase disabled:opacity-80 tracking-wider'>
                     Create Listing
                   </button>
                </div>
            </form>
        </main>
    )
}
