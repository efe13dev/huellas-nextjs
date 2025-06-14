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
  <div className='min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10'>
    <div className='container mx-auto px-6 py-12 md:py-24'>
      <div className='h-8 w-32 bg-muted rounded-lg mb-8 animate-pulse'></div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
        <div className='bg-muted/50 rounded-2xl h-[400px] md:h-[600px] animate-pulse'></div>
        <div className='space-y-6'>
          <div className='h-12 bg-muted/50 rounded-lg animate-pulse'></div>
          <div className='space-y-4'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='flex items-center space-x-3'>
                <div className='h-6 w-6 bg-muted/50 rounded-full animate-pulse'></div>
                <div className='h-6 bg-muted/50 rounded w-3/4 animate-pulse'></div>
              </div>
            ))}
          </div>
          <div className='space-y-3'>
            {[...Array(4)].map((_, index) => (
              <div key={index} className='h-4 bg-muted/50 rounded w-full animate-pulse'></div>
            ))}
          </div>
          <div className='h-14 bg-muted/50 rounded-xl animate-pulse'></div>
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
      <div className='min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10 flex items-center justify-center'>
        <div className='text-center space-y-6'>
          <div className='w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center'>
            <FaPaw className='w-12 h-12 text-muted-foreground' />
          </div>
          <h2 className='text-3xl font-bold text-foreground'>Animal no encontrado</h2>
          <p className='text-muted-foreground max-w-md mx-auto'>
            Lo sentimos, no pudimos encontrar la información de este animal.
          </p>
          <Link
            href='/adoptions'
            className='inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-lift'
          >
            <FaArrowLeft className='w-4 h-4' />
            Volver a adopciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10'>
      <div className='container mx-auto px-6 py-12 md:py-24'>
        <Link
          href='/adoptions'
          className='inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300 mb-8 group'
        >
          <FaArrowLeft className='w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1' />
          <span className='font-medium'>Volver a adopciones</span>
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Columna de imagen */}
          <div className='animate-slide-from-left'>
            <div className='relative bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl shadow-2xl overflow-hidden h-[400px] md:h-[600px]'>
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
                      alt={`Imagen de ${adoption.name}`}
                      className='w-full h-full object-cover'
                    />
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Columna de información */}
          <div className='animate-slide-from-right space-y-8'>
            <div className='text-center lg:text-left'>
              <h1 className='text-4xl md:text-5xl font-bold text-foreground mb-4'>
                {adoption.name}
              </h1>
              <div className='w-24 h-1 bg-gradient-to-r from-primary to-soft-blue mx-auto lg:mx-0 rounded-full'></div>
            </div>

            {/* Información básica */}
            <div className='bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg space-y-4'>
              <h3 className='text-lg font-semibold text-foreground mb-4'>Información básica</h3>
              <div className='grid grid-cols-2 gap-4'>
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
                  label='Edad'
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
            </div>

            {/* Descripción */}
            <div className='bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg'>
              <h3 className='text-lg font-semibold text-foreground mb-4'>Sobre {adoption.name}</h3>
              <div className='text-muted-foreground leading-relaxed space-y-4'>
                {adoption.description.split('\n\n').map((paragraph, index) => (
                  <p key={index} className='text-base'>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Botón de adopción */}
            <div className='pt-4'>
              <Link
                href={`/contact?adoption=${adoption.name}`}
                className='block w-full'
              >
                <button className='w-full h-14 bg-gradient-to-r from-primary to-soft-blue hover:from-soft-blue hover:to-primary text-white font-semibold text-lg rounded-xl transition-all duration-300 hover-lift shadow-xl hover:shadow-2xl group'>
                  <span className='flex items-center justify-center gap-3'>
                    <svg className='w-5 h-5 transition-transform duration-300 group-hover:scale-110' fill='currentColor' viewBox='0 0 20 20'>
                      <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                    </svg>
                    Adoptar a {adoption.name}
                  </span>
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
  <div className='flex flex-col space-y-2'>
    <div className='flex items-center gap-2 text-muted-foreground'>
      <span className='text-primary'>{icon}</span>
      <span className='text-sm font-medium'>{label}</span>
    </div>
    <span className='text-foreground font-semibold pl-6'>{value}</span>
  </div>
);

export default AdoptionDetailPage;
