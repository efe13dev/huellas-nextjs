import React, { type JSX } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function KnowUs(): JSX.Element {
  return (
    <section className='flex-grow flex flex-col md:flex-row items-center justify-center px-4 py-12 rounded-xl overflow-hidden shadow-2xl mb-20 animate-slide-in'>
      <div className='md:w-1/2 space-y-6 md:pr-12 animate-slide-from-left'>
        <h2 className='text-3xl font-bold text-gray-800'>Conócenos: </h2>
        <p className='text-sm text-gray-500'>Desde 2022</p>
        <p className='text-gray-600 leading-relaxed text-pretty'>
          En Huellas, nuestra{' '}
          <span className='font-semibold text-blue-600'>misión</span> es
          proporcionar un{' '}
          <span className='font-semibold text-blue-600'>
            hogar seguro y acogedor
          </span>{' '}
          a animales abandonados y maltratados. Hemos rescatado y dado en
          adopción a{' '}
          <span className='font-semibold text-blue-600'>
            una gran cantidad de perros y gatos
          </span>
          , brindándoles una{' '}
          <span className='font-semibold text-blue-600'>
            segunda oportunidad en la vida
          </span>
          .
        </p>
        <p className='text-gray-600 leading-relaxed'>
          Nuestro{' '}
          <span className='font-semibold text-blue-600'>
            equipo de voluntarios dedicados
          </span>{' '}
          trabaja incansablemente para cuidar, rehabilitar y encontrar hogares
          permanentes para nuestros amigos peludos. Además, promovemos la{' '}
          <span className='font-semibold text-blue-600'>
            educación sobre el cuidado responsable de mascotas
          </span>{' '}
          y la importancia de la esterilización.
        </p>
        <div className='flex space-x-4'>
          <Link
            href='/adoptions'
            className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 py-2'
          >
            Adopta ahora
          </Link>
          <Link
            href='/contact'
            className='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-blue-600 border border-blue-600 hover:bg-blue-50 h-10 px-4 py-2'
          >
            Ser voluntario
          </Link>
        </div>
      </div>
      <div className='md:w-1/2 mt-8 md:mt-0 animate-slide-from-right'>
        <div className='relative'>
          <Image
            src='/know-us-image-optimized.webp'
            alt='A puppy dog looking for a home'
            width={600}
            height={400}
            className='rounded-lg shadow-xl h-full w-full object-cover'
          />
          <div className='absolute -bottom-10 left-0 bg-white px-4 py-2 rounded-lg shadow-md md:px-4 md:py-2'>
            <p className='text-xs font-semibold text-gray-800 md:text-sm'>
              Un hogar para cada huella que necesita amor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KnowUs;
