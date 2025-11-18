import { setUser } from 'src/config';
import { findUser } from 'src/lib/db/queries/users';

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error('Login command expects username');
  }

  const userName = args[0];
  const user = await findUser(userName);
  if (!user) {
    throw new Error("User doesn't exist");
  }

  setUser(user.name);
  console.log(`The user has been set to: ${user.name}`);
}
