import React from 'react';
import Link from 'next/link';
import ImageSlider from '@/components/ImageSlider';
import { getOneAdoption } from '@/db/clientTurso';
import { type TursoDataResponse } from '@/types';
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

interface AdoptionDetailProps {
  params: {
    id: string;
  };
}

// Función auxiliar para traducir el tipo de mascota
const traducirTipo = (type: string): string => {
  switch (type.toLowerCase()) {
    case 'dog':
      return 'Perro';
    case 'cat':
      return 'Gato';
    default:
      return 'Otro';
  }
};

const AdoptionDetailPage: React.FC<AdoptionDetailProps> = async (props) => {
  const params = await props.params;
  const data: TursoDataResponse = await getOneAdoption(params.id);
  const adoption = data.rows[0];

  // Agregar una comprobación para asegurarse de que adoption existe
  if (adoption === null || adoption === undefined) {
    return <div>No se encontró la adopción</div>;
  }

  // Determinar la imagen de respaldo según el tipo de mascota
  const getFallbackImage = (type: string): string => {
    switch (type.toLowerCase()) {
      case 'dog':
        return '/card-image-dog.jpg';
      case 'cat':
        return '/card-image-cat.jpg';
      default:
        return '/card-image.jpg';
    }
  };

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
                value={traducirTamaño(adoption.size)}
                icon={<FaRuler />}
              />
              <InfoItem
                label='Edad (aproximada)'
                value={traducirEdad(adoption.age)}
                icon={<FaBirthdayCake />}
              />
              <InfoItem
                label='Género'
                value={traducirGenero(adoption.genre)}
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

// Función auxiliar para traducir el tamaño
const traducirTamaño = (size: string): string => {
  switch (size.toLowerCase()) {
    case 'small':
      return 'Pequeño';
    case 'medium':
      return 'Mediano';
    case 'big':
      return 'Grande';
    default:
      return size;
  }
};

// Función auxiliar para traducir el género
const traducirGenero = (genre: string): string => {
  switch (genre.toLowerCase()) {
    case 'male':
      return 'Macho';
    case 'female':
      return 'Hembra';
    default:
      return 'Desconocido';
  }
};

const traducirEdad = (age: string): string => {
  switch (age.toLowerCase()) {
    case 'puppy':
      return 'Cachorro';
    case 'young':
      return 'Adulto Joven';
    case 'adult':
      return 'Adulto';
    case 'senior':
      return 'Anciano';
    default:
      return age; // Devuelve el valor original si no coincide con ningún caso
  }
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
