import React, { useState } from 'react'
import upload from '../assets/upload.jpg'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image, setImage] = useState(false)

  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData()
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)

      image && formData.append("image", image)

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        setDescription('')
        setCategory('')
        setPrice('')
        setImage(false)
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className='ml-4 flex flex-col w-full items-start'>
      <div>
        <p className='m-3'>Upload Image</p>
        <div>
          <label htmlFor="image">
            <img src={!image ? upload : URL.createObjectURL(image)} alt="" className='w-20 cursor-pointer' />
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
          </label>
        </div>
      </div>

      <div className='w-full mt-3'>
        <p className='mb-2'>Product Description</p>
        <input onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type Here' required />
      </div>

      <div className='w-full mt-3'>
        <p className='mb-2'>Category</p>
        <input onChange={(e) => setCategory(e.target.value)} value={category} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Category' required />
      </div>
      <div className='w-full mt-3'>
        <p className='mb-2'>Product Price</p>
        <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='Type Here' required />
      </div>

      <div>
        <button type="submit" className='w-25 py-2 mt-4 bg-black text-white cursor-pointer'>ADD</button>
      </div>
    </form>
  )
}

export default Add
