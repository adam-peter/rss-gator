import { handlerAddFeed } from './commands/addFeed';
import { handlerAgg } from './commands/agg';
import {
  CommandsRegistry,
  registerCommand,
  runCommand,
} from './commands/command';
import { handlerFeeds } from './commands/feeds';
import { handlerFollow } from './commands/follow';
import { handlerFollowing } from './commands/following';
import { handlerLogin } from './commands/login';
import { handlerRegister } from './commands/register';
import { handlerReset } from './commands/reset';
import { handlerUnfollow } from './commands/unfollow';
import { handlerUsers } from './commands/users';
import { middlewareLoggedIn } from './middleware/login';

async function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, 'login', handlerLogin);
  registerCommand(commands, 'register', handlerRegister);
  registerCommand(commands, 'reset', handlerReset);
  registerCommand(commands, 'users', handlerUsers);
  registerCommand(commands, 'agg', handlerAgg);
  registerCommand(commands, 'addfeed', middlewareLoggedIn(handlerAddFeed));
  registerCommand(commands, 'feeds', handlerFeeds);
  registerCommand(commands, 'follow', middlewareLoggedIn(handlerFollow));
  registerCommand(commands, 'following', middlewareLoggedIn(handlerFollowing));
  registerCommand(commands, 'unfollow', middlewareLoggedIn(handlerUnfollow));

  const rawArgs = process.argv.slice(2);
  if (rawArgs.length === 0) {
    console.error('Not enough arguments were provided');
    process.exit(1);
  }

  const [cmdName, ...args] = rawArgs;

  try {
    await runCommand(commands, cmdName, ...args);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  process.exit(0);
}

main();
