import React from 'react';
import Link from 'next/link';
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
              <div className='flex items-center lg:gap-1'>
                <p className='pr-2'>Tamaño:</p>
                {animal.size === 'small' && (
                  <>
                    <img
                      className='w-8'
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-16 opacity-10'
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-20 opacity-10'
                      src='./dog-size-card.png'
                      alt=''
                    />
                  </>
                )}
                {animal.size === 'medium' && (
                  <>
                    <img
                      className='w-8 opacity-50'
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-16 '
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-20 opacity-10'
                      src='./dog-size-card.png'
                      alt=''
                    />
                  </>
                )}
                {animal.size === 'big' && (
                  <>
                    <img
                      className='w-8 opacity-10'
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-16 opacity-10'
                      src='./dog-size-card.png'
                      alt=''
                    />
                    <img
                      className='w-20 '
                      src='./dog-size-card.png'
                      alt=''
                    />
                  </>
                )}
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Link
                href={`/adoptions/${animal.id}`}
                passHref
                prefetch={false}
              >
                <Button className='w-fit flex justify-center transition duration-300 ease-in-out hover:text-yellow-500'>
                  Ver más
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Adoptions;
