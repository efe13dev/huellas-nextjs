import { type AnimalType, type TursoDataResponse } from '@/types';
import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN
});

export async function getAdoptions(): Promise<AnimalType[]> {
  const allAdoptions: TursoDataResponse = await client.execute(
    'SELECT * FROM animals'
  );
  console.log(allAdoptions);
  return allAdoptions.rows;
}
