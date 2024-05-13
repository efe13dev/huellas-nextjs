import { createClient } from '@libsql/client';

const client = createClient({
  url: 'libsql://fido-shelter-eefee87.turso.io',
  authToken:
    'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTU2MTY4ODgsImlkIjoiMDczOWFiOTItOTcwMS00MGFhLTg3ZDYtODY5ZDJlZmUyYWZkIn0.PgOw5phFLa9WSopR4ZJd-K9Uy8j4XVz8jcVcr4QIGr4q7glWoX4nQk7-Snmi79wVakrN8uNlKDhNnMwzGbnpDA'
});

export async function getAdoptions() {
  const allAdoptions = await client.execute('SELECT * FROM animals');
  return allAdoptions;
}
