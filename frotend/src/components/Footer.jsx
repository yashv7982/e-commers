import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-white py-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
          {/* Logo and Description */}
          <div>
            <h1 className='text-3xl font-semibold mb-4'>FOREVER<span className='text-pink-500'>.</span></h1>
            <p className='text-gray-500'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
          </div>

          {/* Company Links */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>COMPANY</h2>
            <ul className='text-gray-500'>
              <li className='mb-2'><a href='#'>Home</a></li>
              <li className='mb-2'><a href='#'>About us</a></li>
              <li className='mb-2'><a href='#'>Delivery</a></li>
              <li><a href='#'>Privacy policy</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h2 className='text-xl font-semibold mb-4'>GET IN TOUCH</h2>
            <p className='text-gray-500 mb-2'>+1-212-456-7890</p>
            <p className='text-gray-500'>greatstackdev@gmail.com</p>
          </div>
        </div>

        <hr className='my-6 border-gray-300' />

        {/* Copyright Section */}
        <div className='text-center text-gray-500 text-sm'>
          Copyright 2024 © GreatStack.dev - All Right Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
