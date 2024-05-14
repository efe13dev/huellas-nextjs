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
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <Button>Ver más</Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Adoptions;
