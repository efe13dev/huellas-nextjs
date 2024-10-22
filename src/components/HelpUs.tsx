import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function HelpUs(): JSX.Element {
  return (
    <section className='flex-grow flex flex-col md:flex-row bg-gray-800 rounded-xl overflow-hidden shadow-2xl animate-slide-in'>
      <div className='md:w-1/2 animate-slide-from-left'>
        <Image
          src='/pexels-bruno.jpg'
          alt='Golden Retriever looking sad'
          width={600}
          height={400}
          className='h-full w-full object-cover'
        />
      </div>
      <div className='md:w-1/2 p-12 space-y-6 flex flex-col justify-center animate-slide-from-right'>
        <h3 className='text-3xl font-bold text-white delay-1'>
          Ayúdanos a hacer la diferencia
        </h3>
        <p className='text-gray-300 leading-relaxed delay-2'>
          En nuestra protectora, cada día luchamos por dar una{' '}
          <span className='font-semibold text-blue-300'>
            segunda oportunidad
          </span>{' '}
          a animales abandonados y maltratados. Sin recibir ningún tipo de
          subvención, dependemos completamente de la{' '}
          <span className='font-semibold text-blue-300'>
            generosidad de personas como tú
          </span>
          . Tu apoyo es crucial para proporcionarles alimento, atención
          veterinaria y un hogar temporal mientras encuentran una familia para
          siempre.
        </p>
        <p className='text-gray-300 leading-relaxed delay-3'>
          Con tu donación, no solo estás ayudando a un animal necesitado, sino
          que también estás contribuyendo a mantener nuestra labor independiente
          y a crear una{' '}
          <span className='font-semibold text-blue-300'>
            sociedad más compasiva y responsable
          </span>
          . Cada gesto cuenta, y juntos podemos cambiar vidas, una patita a la
          vez.
        </p>
        <Link
          href='https://www.teaming.net/protectorafido'
          className='bg-green-500 hover:bg-green-600 text-white self-start px-4 py-2 rounded-md font-semibold transition-colors duration-200 delay-4'
        >
          Donar ahora
        </Link>
      </div>
    </section>
  );
}

export default HelpUs;
