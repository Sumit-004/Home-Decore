import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";

const List = ({ token }) => {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list', { headers: { token } })
      console.log("Fetched response:", response.data); // 👈 LOG

      if (response.data.success) {
        console.log("Products:", response.data.products); // 👈 LOG
        setList(response.data.products);

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.error("Fetch error:", error); // 👈 LOG
      console.log(error);
      toast.error(error.message)

    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();

      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className='my-4 ml-4 text-2xl'>All Products List</p>
      <div className='flex flex-col gap-2 ml-4'>

        <div className='hidden md:flex md:flex-row py-1 px-2 border bg-gray-100 text-sm'>
          <div className='w-3/4 flex gap-42 ml-6'>
            <b>Image</b>
            <b>Description</b>
            <b>Category</b>
          </div>
          <div className='w-1/4 flex justify-between'>
            <b>Price</b>
            <b>Action</b>
          </div>
        </div>

        {
          list.map((item, index) => (
            <div key={index} className='flex flex-col md:flex md:flex-row md:justify-between items-center py-2 px-2 border border-gray-400 text-sm'>
              <div className=''>
                <img className='w-20 md:w-24 md:h-24 h-20 object-cover rounded' src={item.image[0]} alt="product" />
              </div>
              <div className='w-1/5 flex justify-start'>
                <p>{item.description}</p>
              </div>
              <div className='w-1/5'>
                <p>{item.category}</p>
              </div>
              <div className='flex justify-between mt-2 w-[27%]'>
                <p className='flex items-center'><LiaRupeeSignSolid className="mr-1" />{item.price}</p>
                <div className='flex items-center justify-center'>
                  <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg text-red-600 hover:text-red-800 transition'><RiDeleteBinLine /></p>
                </div>
              </div>
            </div>
          ))
        }

      </div>
    </>
  )
}

export default List
