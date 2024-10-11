import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItmes = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <div>
            <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
                <div className='overflow-hidden'>
                    <img 
                        src={image?.[0] || 'path/to/default-image.jpg'} 
                        className='hover:scale-110 transition ease-in-out' 
                        alt={name || 'Product Image'} 
                    />
                </div>
            </Link>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </div>
    );
};

export default ProductItmes;
