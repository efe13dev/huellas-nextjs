import React from 'react';
import ImageSlider from '@/components/ImageSlider';
import { getOneAdoption } from '@/db/clientTurso';
import { type TursoDataResponse } from '@/types';

interface AdoptionDetailProps {
  params: {
    id: string;
  };
}

const AdoptionDetail: React.FC<AdoptionDetailProps> = async ({ params }) => {
  const data: TursoDataResponse = await getOneAdoption(params.id);
  const adoption = data.rows[0];
  if (adoption === null) {
    return <div>Mascota no encontrada</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center h-max'>
      <div className='w-full max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg overflow-hidden flex items-center justify-center'>
            {(() => {
              const parsedPhotos =
                typeof adoption.photos === 'string' && adoption.photos !== ''
                  ? JSON.parse(adoption.photos)
                  : [];
              return parsedPhotos.length > 0 ? (
                <div className='w-full '>
                  <ImageSlider
                    images={parsedPhotos}
                    fallbackImage='/card-image.jpg'
                  />
                </div>
              ) : (
                <p>No hay imágenes disponibles</p>
              );
            })()}
          </div>
          <div className='bg-white rounded-lg shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-200px)]'>
            <h1 className='text-4xl font-bold mb-6 text-center text-gray-800'>
              {adoption.name}
            </h1>
            <div className='space-y-4'>
              <InfoItem
                label='Especie'
                value={adoption.type}
              />
              <InfoItem
                label='Tamaño'
                value={adoption.size}
              />
              <InfoItem
                label='Edad'
                value={adoption.age.toString()}
              />
              <InfoItem
                label='Género'
                value={adoption.genre}
              />
            </div>
            <p className='text-lg my-6 text-gray-700 leading-relaxed'>
              {adoption.description}
            </p>
            <button className='w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold text-lg shadow-md'>
              Adoptar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ label: string; value: string }> = ({
  label,
  value
}) => (
  <p className='text-xl'>
    <span className='font-semibold text-gray-700'>{label}:</span>{' '}
    <span className='text-gray-600'>{value}</span>
  </p>
);

export default AdoptionDetail;
