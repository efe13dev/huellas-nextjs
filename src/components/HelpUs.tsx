import React from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image'; // Asumiendo que estás usando Next.js

function HelpUs(): JSX.Element {
  return (
    <section className='lg:m-40 m-8 rounded-lg overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 shadow-xl'>
      <div className='flex flex-col lg:flex-row'>
        <div className='lg:w-1/2 p-10 flex flex-col gap-6 justify-center'>
          <h2 className='text-3xl font-bold text-white'>Ayúdanos a hacer la diferencia</h2>
          <p className='text-pretty text-slate-300'>
            En nuestra protectora, cada día luchamos por dar una segunda oportunidad a animales abandonados y maltratados. Sin recibir ningún tipo de subvención, dependemos completamente de la generosidad de personas como tú. Tu apoyo es crucial para proporcionarles alimento, atención veterinaria y un hogar temporal mientras encuentran una familia para siempre.
          </p>
          <p className='text-pretty text-slate-300'>
            Con tu donación, no solo estás ayudando a un animal necesitado, sino que también estás contribuyendo a mantener nuestra labor independiente y a crear una sociedad más compasiva y responsable. Cada gesto cuenta, y juntos podemos cambiar vidas, una patita a la vez.
          </p>
          <Link 
            href="https://www.teaming.net/protectorafido"
            className='inline-block w-fit px-8 py-3 text-lg font-semibold mt-4 bg-emerald-500 hover:bg-emerald-600 transition-colors rounded text-white text-center'
          >
            Donar ahora
          </Link>
        </div>
        <div className='lg:w-1/2 relative min-h-[300px] lg:min-h-[500px]'>
          <Image
            src="/pexels-bruno.jpg"
            alt="Imagen representativa de nuestra causa"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HelpUs;
