import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backendURl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {

    const [list, setList] = useState([])

    // Fetch all products
    const fetchList = async () => {
        try {
            const response = await axios.get(backendURl + '/api/product/list')
            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Remove product
    const removeProduct = async (id) => {
        try {
            const response = await axios.delete(`${backendURl}/api/product/remove/${id}`, {
                headers: { token: `${token}` }
            });
    
            if (response.data.success) {
                toast.success("Product removed successfully");
                // Update list after deletion
                setList(list.filter(product => product._id !== id));
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    

    useEffect(() => { fetchList() }, [])

    return (
        <>
            <p className='mb-2'>All Product List</p>

            {/* Table header */}
            <div className='flex flex-col gap-2'>
                <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
                    <b>Image</b>
                    <b>Name</b> 
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
            </div>

            {/* Product list */}
            {
                list.map((item, index) => (
                    <div className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
                        <img src={item.image[0]} className='w-12' alt={item.name} />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{"$"}{item.price}</p>
                        <div>
                            <button 
                                onClick={() => removeProduct(item._id)} 
                                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            }
        </>
    )
}

export default List
