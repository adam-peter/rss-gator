import fs from 'fs';
import os from 'os';
import path from 'path';

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(userName: string) {
  const config = readConfig();
  config.currentUserName = userName;
  writeConfig(config);
}

export function readConfig(): Config {
  const fullPath = getConfigFilePath();
  const data = fs.readFileSync(fullPath, 'utf-8');
  const rawConfig = JSON.parse(data);

  return validateConfig(rawConfig);
}

function getConfigFilePath(): string {
  return path.join(os.homedir(), 'projects/boot.dev/rss-gator'  ,'.gatorconfig.json');
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== 'string') {
    throw new Error('db_url is required in config file');
  }
  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== 'string'
  ) {
    throw new Error('current_user_name is required in config file');
  }

  const config: Config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };

  return config;
}

function writeConfig(cfg: Config): void {
  const rawConfig = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  fs.writeFileSync(getConfigFilePath(), JSON.stringify(rawConfig), {
    encoding: 'utf-8',
  });
}
