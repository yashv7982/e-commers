import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets.js';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext.jsx';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
    };

    return (
        <div className='flex items-center justify-between py-5 font-medium'>

            <Link to='/'>
                <img src={assets.logo} className='w-36' alt="Logo" />
            </Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className='flex flex-col items-center gap-1'>
                    <p>Home</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/collection' className='flex flex-col items-center gap-1'>
                    <p>Collection</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/about' className='flex flex-col items-center gap-1'>
                    <p>About</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
                <NavLink to='/contact' className='flex flex-col items-center gap-1'>
                    <p>Contact</p>
                    <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="Search" />

                <div className='group relative'>
                    {token ? (
                        <div>
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Profile" />
                            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                                <div className='flex flex-col gap-2 w-36 py-3 bg-slate-100 text-gray-500 rounded'>
                                    <Link to='/profile' className='cursor-pointer hover:text-black'>My Profile</Link>
                                    <Link to='/orders' className='cursor-pointer hover:text-black'>Orders</Link>
                                    <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link to={'/login'}>
                            <img src={assets.profile_icon} className='w-5 cursor-pointer' alt="Login" />
                        </Link>
                    )}
                </div>

                <Link to='/cart' className='relative'>
                    <img src={assets.cart_icon} className='w-5 min-w-5' alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 text-white bg-black aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>

                <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="Menu" />
            </div>

            {/* Side Bar Menu for Small Screen */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="Back" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>Home</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>Collection</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>Contact</NavLink>
                    <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>About</NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
