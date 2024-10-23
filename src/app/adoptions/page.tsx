import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { type TursoDataResponse } from '@/types';
import { getAdoptions } from '@/db/clientTurso';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function translateSize(size: string | null | undefined): string {
  if (size == null || size.trim() === '') return 'Desconocido';

  const sizeTranslations: Record<string, string> = {
    small: 'Pequeño',
    medium: 'Mediano',
    big: 'Grande'
  };

  return sizeTranslations[size.toLowerCase()] ?? 'Otro';
}

// Función auxiliar para obtener la imagen de respaldo según el tipo
function getFallbackImage(type: string): string {
  switch (type.toLowerCase()) {
    case 'dog':
      return './card-image-dog.jpg';
    case 'cat':
      return './card-image-cat.jpg';
    default:
      return './card-image.jpg';
  }
}

async function Adoptions(): Promise<React.JSX.Element> {
  const data: TursoDataResponse = await getAdoptions();
  const animals = data.rows;

  return (
    <main className='container mx-auto px-4 py-8'>
      <h2 className='text-center text-4xl font-bold mb-12 animate-slide-in'>
        <span className='bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text'>
          Encuentra
        </span>{' '}
        <span className='bg-gradient-to-r from-gray-900 via-gray-700 to-gray-500 text-transparent bg-clip-text'>
          a tu nuevo
        </span>{' '}
        <span className='bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text'>
          compañero
        </span>
      </h2>
      {animals.length > 0 ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {animals.map((animal, index) => (
            <Card
              key={animal.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-[500px] animate-slide-in delay-${index % 6}`}
            >
              <div className='relative h-64'>
                <img
                  src={(() => {
                    if (
                      typeof animal.photos === 'string' &&
                      animal.photos.trim() !== ''
                    ) {
                      try {
                        const photosArray = JSON.parse(animal.photos);
                        return Array.isArray(photosArray) &&
                          photosArray.length > 0
                          ? photosArray[0]
                          : getFallbackImage(animal.type);
                      } catch (e) {
                        return getFallbackImage(animal.type);
                      }
                    }
                    return getFallbackImage(animal.type);
                  })()}
                  alt={animal.name}
                  className='absolute top-0 left-0 w-full h-full object-contain'
                />
              </div>
              <CardContent className='p-6 flex-grow overflow-hidden'>
                <CardTitle className='text-2xl mb-2'>{animal.name}</CardTitle>
                <p className='text-muted-foreground mb-4 line-clamp-2'>
                  {animal.description}
                </p>
                <Badge
                  variant='outline'
                  className='mb-4'
                >
                  Tamaño: {translateSize(animal.size)}
                </Badge>
              </CardContent>
              <CardFooter className='p-6'>
                <Link
                  href={`/adoptions/${animal.id}`}
                  className='w-full'
                >
                  <Button className='w-full transition duration-300 ease-in-out hover:bg-white hover:text-black'>
                    Ver más
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className='text-center text-xl text-gray-600'>
          No hay animales para mostrar en este momento.
        </p>
      )}
    </main>
  );
}

export default Adoptions;
