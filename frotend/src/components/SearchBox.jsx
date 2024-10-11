import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLoaderData, useLocation } from 'react-router-dom';

const SearchBox = () => {

    const { search, setSearch, setShowSearch, showSearch } = useContext(ShopContext);
    const location = useLocation()
    const [visible,setVisible] = useState(false)

    useEffect(()=>{
        if(location.pathname.includes('collection') ){
            setVisible(true)
        }else{
            setVisible(false)
        }
        
    },[location])

    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center py-6'>
            <div className='inline-flex items-center justify-between border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 border'>
                {/* Input Field */}
                <input 
                    type="text" 
                    placeholder='Search' 
                    className='flex-1 outline-none bg-inherit text-sm px-3' 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                />

                {/* Search Icon */}
                <img src={assets.search_icon} className='w-4 cursor-pointer' alt="search-icon" />
            </div>

            {/* Close Icon */}
            <img 
                src={assets.cross_icon} 
                className='inline w-4 ml-4 cursor-pointer' 
                onClick={() => setShowSearch(false)} 
                alt="close-icon" 
            />
        </div>
    ) : null;
}

export default SearchBox;
