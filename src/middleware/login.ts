import { CommandHandler, UserCommandHandler } from 'src/commands/command';
import { readConfig } from 'src/config';
import { findUser } from 'src/lib/db/queries/users';

export function middlewareLoggedIn(
  handler: UserCommandHandler
): CommandHandler {
  return async (cmdName: string, ...args: string[]) => {
    const config = readConfig();
    const user = await findUser(config.currentUserName);
    if (!user) {
      throw new Error(`User ${config.currentUserName} not found`);
    }

    await handler(cmdName, user, ...args);
  };
}
