import React from 'react';
import { type TursoDataResponse } from '@/types';
import { getAdoptions } from '@/db/clientTurso';

async function Adoptions(): Promise<JSX.Element> {
  const data: TursoDataResponse = await getAdoptions();
  const adoptions = data.rows;

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
