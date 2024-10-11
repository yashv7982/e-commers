import React from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsLetterBox';


const ContactUs = () => {
  return (
    <div className='border-t pt-16'>
      {/* Contact Us Section */}
      <div className='flex flex-col sm:flex-row gap-10 items-center px-4 sm:px-16'>
        <div className='flex-1'>
          <img src={assets.contact_img} className='w-full h-auto' alt="Contact Us" />
        </div>
        <div className='flex-1 text-gray-700'>
          <h1 className='text-3xl font-semibold mb-4'>
            CONTACT <span className='text-black'>US</span>
          </h1>
          <p className='text-sm mb-4'>
            <strong>OUR STORE</strong><br/>
            5109 Willis Station<br/>
            Suite 320, Washington, USA<br/>
            <br/>
            Tel: (+03) 555-0192<br/>
            Email: greatstackdev@gmail.com
          </p>
          <h2 className='text-lg font-semibold mb-4'>
            CAREERS AT FOREVER
          </h2>
          <p className='text-sm mb-4'>
            Learn more about our teams and job openings.
          </p>
          <button className='border px-6 py-2 text-sm font-medium rounded-sm'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Add spacing before the Newsletter */}
      <div className='mt-16 mb-16'>
        <NewsletterBox/>
      </div>
    </div>
  );
};

export default ContactUs;
