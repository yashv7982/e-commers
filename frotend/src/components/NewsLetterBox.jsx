import React from 'react'

const NewsletterBox = () => {

  const onSubmitHandler = (event) => {
    event.preventDefault();
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
      <p className='text-gray-400 mt-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto mt-5 max-w-lg'>
        <input className='w-full outline-none px-4 py-3 border border-gray-300' type="email" placeholder='Enter your email' />
        <button type='submit' className='bg-black text-white text-xs px-6 py-3'>
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

export default NewsletterBox;
