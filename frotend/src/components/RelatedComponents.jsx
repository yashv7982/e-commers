import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import Title from './Title'
import ProductItmes from './ProductItmes'

const RelatedComponents = ({category,subCategory}) => {

    const {products} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{

        if(products.length > 0 ){

            let prodcutCopy = products.slice();
            prodcutCopy = prodcutCopy.filter((item)=> category === item.category)
            prodcutCopy = prodcutCopy.filter((item)=> subCategory === item.subCategory )

            setRelated  (prodcutCopy.slice(0,5));
            
        }

    },[products])

  return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2' >

            <Title text1={"Related"} text2={'Products'} />

        </div>

        <div className='grid grid-cols-2 sm:grid-cols3 md:grid-cols-5 gap-4 gap-y-6 '>
            {
                related.map((item,index)=>(
                    <ProductItmes key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
            }
        </div>

    </div>
  )
}

export default RelatedComponents