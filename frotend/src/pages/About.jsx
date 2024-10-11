import React from 'react';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsLetterBox';


const AboutUs = () => {
  return (
    <div className='border-t pt-16 mt-16 mb-16'>
      {/* About Us Section */}
      <div className='flex flex-col sm:flex-row gap-10 items-center px-4 sm:px-16'>
        <div className='flex-1'>
          <img src={assets.about_img} className='w-full h-auto' alt="About Us" />
        </div>
        <div className='flex-1 text-gray-700'>
          <h1 className='text-3xl font-semibold mb-4'>
            ABOUT <span className='text-black'>US</span>
          </h1>
          <p className='text-sm mb-4'>
            Forever Was Born Out Of A Passion For Innovation And A Desire To Revolutionize The Way People Shop Online. Our Journey Began With A Simple Idea: To Provide A Platform Where Customers Can Easily Discover, Explore, And Purchase A Wide Range Of Products From The Comfort Of Their Homes.
          </p>
          <p className='text-sm mb-4'>
            Since Our Inception, We’ve Worked Tirelessly To Curate A Diverse Selection Of High-Quality Products That Cater To Every Taste And Preference. From Fashion And Beauty To Electronics And Home Essentials, We Offer An Extensive Collection Sourced From Trusted Brands And Suppliers.
          </p>
          <h2 className='text-lg font-semibold mb-2'>Our Mission</h2>
          <p className='text-sm'>
            Our Mission At Forever Is To Empower Customers With Choice, Convenience, And Confidence. We’re Dedicated To Providing A Seamless Shopping Experience That Exceeds Expectations, From Browsing And Ordering To Delivery And Beyond.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className='pt-16 px-4 sm:px-16'>
        <h1 className='text-2xl font-semibold mb-6 text-center'>
          WHY <span className='text-black'>CHOOSE US</span>
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
          {/* Quality Assurance */}
          <div className='border p-6'>
            <h3 className='text-lg font-semibold mb-2'>QUALITY ASSURANCE:</h3>
            <p className='text-sm'>
              We Meticulously Select And Vet Each Product To Ensure It Meets Our Stringent Quality Standards.
            </p>
          </div>

          {/* Convenience */}
          <div className='border p-6'>
            <h3 className='text-lg font-semibold mb-2'>CONVENIENCE:</h3>
            <p className='text-sm'>
              With Our User-Friendly Interface And Hassle-Free Ordering Process, Shopping Has Never Been Easier.
            </p>
          </div>

          {/* Customer Service */}
          <div className='border p-6'>
            <h3 className='text-lg font-semibold mb-2'>EXCEPTIONAL CUSTOMER SERVICE:</h3>
            <p className='text-sm'>
              Our Team Of Dedicated Professionals Is Here To Assist You Every Step Of The Way, Ensuring Your Satisfaction Is Our Top Priority.
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Box Component */}
      <div className='mt-16 mb-16'>
        <NewsletterBox/>
      </div>

      {/* Footer Component */}
 
    </div>
  );
};

export default AboutUs;
