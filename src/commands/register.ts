import { setUser } from 'src/config';
import { createUser, findUser } from 'src/lib/db/queries/users';

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error('Register command expects username');
  }

  const userName = args[0];

  const existingUser = await findUser(userName);
  if (existingUser) {
    throw new Error(`User '${userName}' already exists`);
  }

  const user = await createUser(userName);
  setUser(user.name);
  console.log('User was created!');
  console.log(user);
}
