import React, { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { type TursoDataResponse } from '@/types';
import { getAdoptions } from '@/db/clientTurso';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { translateSize, getFallbackImage } from '@/lib/utils';
import AnimalCardSkeletonGrid from '@/components/AnimalCardSkeletonGrid';

async function AnimalsGrid(): Promise<React.JSX.Element> {
  const data: TursoDataResponse = await getAdoptions();
  const animals = data.rows;

  return (
    <>
      {animals.length > 0 ? (
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {animals.map((animal, index) => (
            <Card
              key={animal.id}
              className={`group overflow-hidden hover-lift transition-all duration-500 flex flex-col h-[520px] animate-slide-in delay-${index % 6} bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-2xl`}
            >
              <div className='relative h-72 overflow-hidden'>
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
                  className='absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                <div className='absolute top-4 right-4'>
                  <Badge
                    variant='secondary'
                    className='bg-white/90 text-foreground backdrop-blur-sm shadow-lg'
                  >
                    Tamaño: {translateSize(animal.size)}
                  </Badge>
                </div>
              </div>
              
              <CardContent className='p-6 flex-grow overflow-hidden space-y-4'>
                <CardTitle className='text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300'>
                  {animal.name}
                </CardTitle>
                <p className='text-muted-foreground leading-relaxed line-clamp-3'>
                  {animal.description}
                </p>
              </CardContent>
              
              <CardFooter className='p-6 pt-0'>
                <Link
                  href={`/adoptions/${animal.id}`}
                  className='w-full'
                >
                  <Button className='w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-300 hover-lift shadow-lg hover:shadow-xl group'>
                    <span className='flex items-center justify-center gap-2'>
                      <svg className='w-5 h-5 transition-transform duration-300 group-hover:scale-110' fill='currentColor' viewBox='0 0 20 20'>
                        <path fillRule='evenodd' d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z' clipRule='evenodd' />
                      </svg>
                      Conocer a {animal.name}
                    </span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className='text-center py-16 space-y-6'>
          <div className='w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center'>
            <svg className='w-12 h-12 text-muted-foreground' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
            </svg>
          </div>
          <h3 className='text-2xl font-bold text-foreground'>No hay animales disponibles</h3>
          <p className='text-muted-foreground max-w-md mx-auto'>
            En este momento no tenemos animales disponibles para adopción, pero vuelve pronto.
          </p>
        </div>
      )}
    </>
  );
}

export default function Adoptions(): React.JSX.Element {
  return (
    <div className='min-h-screen bg-gradient-to-br from-white via-primary/5 to-soft-blue/10'>
      <div className='container mx-auto px-6 py-8 md:py-12'>
        <div className='text-center mb-16 space-y-6'>
          <h1 className='text-4xl md:text-6xl font-bold text-gradient bg-gradient-to-r from-primary via-soft-blue to-warm-orange bg-clip-text text-transparent'>
            Adopciones
          </h1>
          <p className='text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
            Encuentra a tu nuevo mejor amigo. Cada uno de estos animales está esperando
            una familia que les brinde el amor y cuidado que merecen.
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-primary to-warm-orange mx-auto rounded-full'></div>
        </div>
        
        <Suspense fallback={<AnimalCardSkeletonGrid />}>
          <AnimalsGrid />
        </Suspense>
      </div>
    </div>
  );
}
