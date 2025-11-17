import { readConfig, setUser } from './config';

function main() {
  setUser('Adam');
  const config = readConfig();
  console.log(config);
}

main();
