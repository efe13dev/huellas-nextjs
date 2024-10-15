import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN
});

export async function getAdoptions(): Promise<any> {
  const availableAdoptions = await client.execute(
    'SELECT * FROM animals WHERE adopted = 0 ORDER BY register_date DESC'
  );

  return availableAdoptions;
}

export async function getOneAdoption(id: string): Promise<any> {
  const adoption = await client.execute({
    sql: 'SELECT * FROM animals WHERE id = ?',
    args: [id]
  });

  return adoption;
}
