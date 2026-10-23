const LocationMap = () => {
  return (
    <section
      className='bg-soft-white px-4 pb-20 pt-32 sm:px-6 md:pb-28 md:pt-40'
      aria-labelledby='location-title'
    >
      <div className='content'>
        <div className='mb-8 text-center md:mb-10'>
          <p className='mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-picto-primary'>
            Based in Pakistan
          </p>
          <h2
            id='location-title'
            className='text-3xl font-semibold text-[#132238] sm:text-4xl md:text-5xl'
          >
            Find me in Islamabad
          </h2>
          <p className='mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-soft-dark sm:text-base'>
            Working with clients locally and around the world from Islamabad,
            Pakistan.
          </p>
        </div>

        <div className='overflow-hidden rounded-3xl border border-white bg-white p-2 shadow-[0px_15px_60px_rgba(19,34,56,0.12)] sm:p-3'>
          <iframe
            title='Map showing Islamabad, Pakistan'
            src='https://www.google.com/maps?q=Islamabad%2C%20Pakistan&output=embed'
            className='h-72 w-full rounded-2xl border-0 sm:h-96 md:h-[30rem]'
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
