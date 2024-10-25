import React, { Suspense } from 'react';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';
import { getOneAdoption } from '@/db/clientTurso';
import { type TursoDataResponse } from '@/types';
import {
  translateAge,
  translateSize,
  translateGenre,
  traducirTipo,
  getFallbackImage
} from '@/lib/utils';
// Importamos los iconos necesarios, incluyendo FaPaw
import {
  FaDog,
  FaCat,
  FaRuler,
  FaBirthdayCake,
  FaVenus,
  FaMars,
  FaPaw,
  FaArrowLeft
} from 'react-icons/fa';

// Componente de esqueleto
const SkeletonLoading = (): React.JSX.Element => (
  <div className='flex flex-col items-center justify-center pt-20 w-full'>
    <div
      className='w-full mx-auto px-4 sm:px-6 lg:px-8'
      style={{ maxWidth: '100rem' }}
    >
      <div className='h-8 w-32 bg-gray-200 rounded mb-4'></div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-gray-200 rounded-lg h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px] animate-pulse'></div>
        <div className='bg-white rounded-lg shadow-lg p-6 flex flex-col'>
          <div className='h-12 bg-gray-200 rounded mb-6'></div>
          <div className='space-y-4'>
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className='flex items-center'
              >
                <div className='h-6 w-6 bg-gray-200 rounded-full mr-2'></div>
                <div className='h-6 bg-gray-200 rounded w-3/4'></div>
              </div>
            ))}
          </div>
          <div className='my-6 space-y-4'>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='h-4 bg-gray-200 rounded w-full'
              ></div>
            ))}
          </div>
          <div className='mt-auto'>
            <div className='h-12 bg-gray-200 rounded w-full'></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Componente principal de la página de detalles
const AdoptionDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
      <AdoptionDetails params={params} />
    </Suspense>
  );
};

// Componente que maneja los detalles de la adopción
const AdoptionDetails = async ({
  params
}: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> => {
  const { id } = await params;
  const data: TursoDataResponse = await getOneAdoption(id);
  const adoption = data.rows[0];

  // Agregar una comprobación para asegurarse de que adoption existe
  if (adoption === null || adoption === undefined) {
    return (
      <div className='text-center text-2xl font-bold'>
        No se encontró la adopción
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center pt-20 w-full'>
      <div
        className='w-full mx-auto px-4 sm:px-6 lg:px-8'
        style={{ maxWidth: '100rem' }}
      >
        <Link
          href='/adoptions'
          className='inline-block mb-4'
        >
          <button className='flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300'>
            <FaArrowLeft className='mr-2' />
            <span>Volver a la lista</span>
          </button>
        </Link>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center animate-slide-from-left h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]'>
            {(() => {
              const parsedPhotos =
                typeof adoption.photos === 'string' && adoption.photos !== ''
                  ? JSON.parse(adoption.photos)
                  : [];
              return parsedPhotos.length > 0 ? (
                <div className='w-full h-full'>
                  <ImageSlider
                    images={parsedPhotos}
                    fallbackImage={getFallbackImage(adoption.type)}
                  />
                </div>
              ) : (
                <div className='w-full h-full'>
                  <img
                    src={getFallbackImage(adoption.type)}
                    alt={`Imagen de respaldo para ${traducirTipo(adoption.type)}`}
                    className='w-full h-full object-cover'
                  />
                </div>
              );
            })()}
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6 overflow-y-auto flex flex-col animate-slide-from-right'>
            <h1 className='text-5xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center'>
              <span className='text-gray-500 mx-2'>·</span>
              <span className='animate-fade-in'>{adoption.name}</span>
              <span className='text-gray-500 mx-2'>·</span>
            </h1>
            <div className='space-y-4'>
              <InfoItem
                label='Tipo'
                value={traducirTipo(adoption.type)}
                icon={
                  adoption.type === 'dog' ? (
                    <FaDog />
                  ) : adoption.type === 'cat' ? (
                    <FaCat />
                  ) : (
                    <FaPaw />
                  )
                }
              />
              <InfoItem
                label='Tamaño'
                value={translateSize(adoption.size)}
                icon={<FaRuler />}
              />
              <InfoItem
                label='Edad (aproximada)'
                value={translateAge(adoption.age)}
                icon={<FaBirthdayCake />}
              />
              <InfoItem
                label='Género'
                value={translateGenre(adoption.genre)}
                icon={
                  adoption.genre.toLowerCase() === 'female' ? (
                    <FaVenus />
                  ) : (
                    <FaMars />
                  )
                }
              />
            </div>
            <div className='my-6 text-gray-700 leading-relaxed'>
              {adoption.description.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className='text-lg mb-4'
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className='mt-auto'>
              <Link
                href={`/contact?adoption=${adoption.name}`}
                className='block w-full'
              >
                <button className='w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-md'>
                  Adoptar ahora
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{
  label: string;
  value: string;
  icon: React.ReactNode;
}> = ({ label, value, icon }) => (
  <p className='text-xl flex items-center'>
    <span className='mr-2 text-gray-600'>{icon}</span>
    <span className='font-semibold text-gray-700'>{label}:</span>{' '}
    <span className='text-gray-600 ml-1'>{value}</span>
  </p>
);

export default AdoptionDetailPage;
