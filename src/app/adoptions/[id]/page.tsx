import { getOneAdoption } from '@/db/clientTurso';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

async function AnimalPage({
  params
}: {
  params: { id: string };
}): Promise<any> {
  const data = await getOneAdoption(params.id);
  const animal = data.rows[0];
  console.log('hola');
  return (
    <main className='flex flex-col '>
      <img
        className='w-44  mx-auto'
        src='./card-image.jpg'
        alt='animal for adopt'
      />
      <h2>{animal.name}</h2>
      <Link href={'/adoptions'}>
        <Button className='w-fit flex justify-center transition duration-300 ease-in-out hover:text-yellow-500'>
          Volver
        </Button>
      </Link>
    </main>
  );
}

export default AnimalPage;
