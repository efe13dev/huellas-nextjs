import React from 'react';
import { type TursoDataResponse } from '@/types';
import { getAdoptions } from '@/db/clientTurso';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

async function Adoptions(): Promise<JSX.Element> {
  const data: TursoDataResponse = await getAdoptions();
  const animals = data.rows;

  return (
    <main>
      <h2 className='text-center text-2xl my-12'>
        Lorem ipsum dolor sit amet.
      </h2>
      <section className='grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3 px-4 '>
        {animals.map((animal) => (
          <Card key={animal.id}>
            <CardHeader>
              <img
                src='./card-image.jpg'
                alt='animal for adopt'
              />
              <CardTitle>{animal.name}</CardTitle>
              <CardDescription>{animal.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='flex items-center lg:gap-4'>
                <p>Tamaño:</p>
                {animal.size === 'small' && (
                  <>
                    <img
                      className='w-16'
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-24 opacity-10'
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-40 opacity-10'
                      src='./size-image.jpg'
                      alt=''
                    />
                  </>
                )}
                {animal.size === 'medium' && (
                  <>
                    <img
                      className='w-12 opacity-50'
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-24 '
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-40 opacity-10'
                      src='./size-image.jpg'
                      alt=''
                    />
                  </>
                )}
                {animal.size === 'big' && (
                  <>
                    <img
                      className='w-12 opacity-10'
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-24 opacity-10'
                      src='./size-image.jpg'
                      alt=''
                    />
                    <img
                      className='w-40 '
                      src='./size-image.jpg'
                      alt=''
                    />
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button>Ver más</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Adoptions;
