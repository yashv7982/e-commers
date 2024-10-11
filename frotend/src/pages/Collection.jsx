import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItmes from '../components/ProductItmes'

const Collection = () => {

    const { products,search,showSearch } = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false)
    const [filterproducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [shortType,setSortType] = useState('relavent')

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else {
            setCategory(prev => [...prev, e.target.value])
        }
    }


    const toggleSubcategory = (e) => {
        if (subCategory.includes(e.target.value)) {

            setSubCategory(prev => prev.filter(item => item !== e.target.value))

        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const ApplyFilter = () => {

        let productcopy = products.slice();
        
        if(showSearch && search){
            productcopy = productcopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {

            productcopy = productcopy.filter(item => category.includes(item.category))

        }
        if (subCategory.length > 0) {
            productcopy = productcopy.filter(item => subCategory.includes(item.subCategory));
        }

        setFilterProducts(productcopy)

    }


    const shortProduct = () => {

        let ftcopy = filterproducts.slice();

        switch (shortType) {
            case 'low-high':
                setFilterProducts(ftcopy.sort((a, b) => (a.price - b.price)))
                break;

            case 'high-low':
                setFilterProducts(ftcopy.sort((a,b)=>(b.price - a.price)));
                break;

            default:
                ApplyFilter();
                break;
        }

    }



    useEffect(() => {
        ApplyFilter();
    }, [category, subCategory,search,showSearch,products])



    useEffect(()=>{
        shortProduct()
    },[shortType])




    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

            {/* Left side  */}
            {/* Filter options */}

            <div className='min-w-60'>

                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>Filters
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" />
                </p>

                {/* category Filter  */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Categories</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Men"} onChange={toggleCategory} /> Men
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Women"} onChange={toggleCategory} /> Women
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Kids"} onChange={toggleCategory} /> Kids
                        </p>

                    </div>



                </div>

                <div className={`border border-gray-300 pl-5 py-3  my-5 ${showFilter ? "" : "hidden"} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Categories</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700 '>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Topwear"} onChange={toggleSubcategory} /> Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Bottomwear"} onChange={toggleSubcategory} /> Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" className='w-3' value={"Winterwear"} onChange={toggleSubcategory} /> Winterwear
                        </p>

                    </div>



                </div>

            </div>

            {/* Right side */}

            <div className='flex-1 '>

                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={"All"} text2={"Collections"} />

                    {/*  product sort */}

                    <select onChange={(e)=>setSortType(e.target.value)} name="" className='border-2 border-gray-300 text-sm px-2 ' id="">
                        <option value="relavent">Sort By: Relavent</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value="high-low">Sort By: High to low</option>
                    </select>
                </div>

                {/* map products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterproducts.map((item, index) => (
                            <ProductItmes key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }


                </div>

            </div>

        </div>
    )
}

export default Collection