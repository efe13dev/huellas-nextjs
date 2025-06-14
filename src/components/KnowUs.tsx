import React, { type JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

function KnowUs(): JSX.Element {
  return (
    <section className='relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl shadow-lg animate-slide-in'>
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-60'></div>
      <div className='relative flex flex-col md:flex-row'>
        <div className='md:w-1/2 p-8 md:p-12 lg:p-16 space-y-8 flex flex-col justify-center animate-slide-from-left'>
          <h2 className='text-3xl lg:text-4xl font-bold text-foreground leading-tight'>
            Conoce nuestra{' '}
            <span className='text-primary'>
              misión
            </span>
          </h2>
          
          <div className='space-y-6 text-muted-foreground leading-relaxed'>
            <p className='text-lg'>
              En{' '}
              <span className='font-semibold text-foreground bg-primary/10 px-2 py-1 rounded-md'>
                Protectora Huellas
              </span>
              , nos dedicamos a rescatar, cuidar y encontrar hogares amorosos para
              animales abandonados y maltratados. Cada animal que llega a nosotros
              recibe atención veterinaria, amor y la oportunidad de una nueva vida.
            </p>
            
            <p className='text-lg'>
              Nuestro equipo de voluntarios trabaja incansablemente para asegurar
              que cada{' '}
              <span className='font-semibold text-foreground bg-primary/10 px-2 py-1 rounded-md'>
                adopción sea exitosa
              </span>{' '}
              y que tanto las familias como los animales encuentren la felicidad
              que merecen.
            </p>
            
            <p className='text-lg'>
              Creemos que cada animal merece una segunda oportunidad y trabajamos
              para crear un mundo donde ningún animal sufra abandono o maltrato.
            </p>
          </div>
          
          <div className='flex flex-col sm:flex-row gap-4 pt-4'>
            <Link
              href='/adoptions'
              className='group relative inline-flex items-center justify-center overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift shadow-lg hover:shadow-xl'
            >
              <span className='relative z-10 flex items-center gap-2'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                </svg>
                Ver adopciones
              </span>
            </Link>
            
            <Link
              href='/contact'
              className='group relative inline-flex items-center justify-center overflow-hidden border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift'
            >
              <span className='relative z-10 flex items-center gap-2'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
                Contáctanos
              </span>
            </Link>
          </div>
        </div>
        
        <div className='md:w-1/2 animate-slide-from-right'>
          <div className='relative overflow-hidden h-full min-h-[400px]'>
            <Image
              src='/know-us-image-optimized.webp'
              alt='Animales felices en la protectora'
              width={600}
              height={400}
              className='h-full w-full object-cover transition-transform duration-700 hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-card/20'></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KnowUs;
