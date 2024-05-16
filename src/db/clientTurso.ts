import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? '',
  authToken: process.env.TURSO_AUTH_TOKEN
});

export async function getAdoptions(): Promise<any> {
  const allAdoptions = await client.execute('SELECT * FROM animals ');

  return allAdoptions;
}
