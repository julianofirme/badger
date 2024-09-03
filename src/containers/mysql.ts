import { ContainerCreateOptions } from "dockerode";
import { ContainerConfig, MySQLOptions } from "../types";

export function createMySQLConfig(options: MySQLOptions): ContainerCreateOptions {
  const config: ContainerConfig = {
    Image: 'mysql:latest',
    Ports: {
      '3306/tcp': {}
    },
    EnvDefaults: {
      MYSQL_ROOT_PASSWORD: 'rootpassword',
      MYSQL_DATABASE: 'testdb',
      MYSQL_USER: 'user',
      MYSQL_PASSWORD: 'password'
    }
  };

  const env = {
    MYSQL_ROOT_PASSWORD: options.rootPassword || config.EnvDefaults.MYSQL_ROOT_PASSWORD,
    MYSQL_DATABASE: options.database || config.EnvDefaults.MYSQL_DATABASE,
    MYSQL_USER: options.user || config.EnvDefaults.MYSQL_USER,
    MYSQL_PASSWORD: options.password || config.EnvDefaults.MYSQL_PASSWORD,
    ...options.additionalEnv
  };

  return {
    Image: config.Image,
    ExposedPorts: config.Ports,
    HostConfig: {
      PortBindings: {
        '3306/tcp': [{ HostPort: options.port || '3306' }]
      }
    },
    Env: Object.entries(env).map(([key, value]) => `${key}=${value}`)
  };
}
