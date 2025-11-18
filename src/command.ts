import { setUser } from './config';

export type CommandHandler = (cmdName: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error('Login command expects username');
  }

  const user = args[0];
  setUser(user);
  console.log(`The user has been set to: ${user}`);
}

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler
) {
  registry[cmdName] = handler;
}

export function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {
  const command = registry?.[cmdName];
  if (!command) {
    console.log("Command doesn't exist");
    process.exit(1);
  }
  command(cmdName, ...args);
}
