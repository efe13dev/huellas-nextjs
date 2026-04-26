import { createClient } from "@libsql/client";
import { unstable_noStore as noStore } from "next/cache";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL ?? "",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function getAdoptions(): Promise<any> {
  noStore();

  const availableAdoptions = await client.execute(
    "SELECT * FROM animals WHERE adopted = 0 ORDER BY register_date DESC",
  );

  return availableAdoptions;
}

export async function getOneAdoption(id: string): Promise<any> {
  noStore();

  const adoption = await client.execute({
    sql: "SELECT * FROM animals WHERE id = ? AND adopted = 0",
    args: [id],
  });

  return adoption;
}
