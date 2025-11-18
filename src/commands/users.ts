import { readConfig } from 'src/config';
import { getUsers } from 'src/lib/db/queries/users';

export async function handlerUsers(cmdName: string, ...args: string[]) {
  const users = await getUsers();
  const config = readConfig();
  users.forEach((user) =>
    console.log(
      `* ${user.name}${config.currentUserName === user.name && ' (current)'}`
    )
  );
}
