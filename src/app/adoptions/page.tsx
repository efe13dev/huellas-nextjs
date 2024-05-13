import React from 'react';
import { type AnimalType } from '@/types';
import { getAdoptions } from '@/db/client';

async function Adoptions(): Promise<JSX.Element> {
  const data = await getAdoptions();
  const adoptions: AnimalType[] = data.rows;

  return (
    <main>
      {adoptions.map((adoption) => (
        <article key={adoption.id}>
          <h3>Nombre: {adoption.name}</h3>
        </article>
      ))}
    </main>
  );
}

export default Adoptions;
