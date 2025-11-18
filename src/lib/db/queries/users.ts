import { db } from '..';
import { users } from '../schema';
import { eq } from 'drizzle-orm';

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name }).returning(); // array destructuring to return 1st item only - drizzle always returns []
  return result;
}

export async function findUser(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function reset() {
  await db.delete(users);
}

export async function getUsers() {
  const result = await db.select().from(users);
  return result;
}