import {
  CommandsRegistry,
  handlerLogin,
  registerCommand,
  runCommand,
} from './command';

function main() {
  const commands: CommandsRegistry = {};
  registerCommand(commands, 'login', handlerLogin);
  const rawArgs = process.argv.slice(2);
  if (rawArgs.length === 0) {
    console.error("Not enough arguments were provided");
    process.exit(1);
  }

  const [cmdName, ...args] = rawArgs;
  
  try {
    runCommand(commands, cmdName, ...args);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

main();
