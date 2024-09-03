import { ContainerCreateOptions } from "dockerode";
import { ContainerConfig, PostgresOptions } from "../types";

export function createPostgresConfig(options: PostgresOptions): ContainerCreateOptions {
  const config: ContainerConfig = {
    Image: 'bitnami/postgresql:latest',
    Ports: {
      '5432/tcp': {}
    },
    EnvDefaults: {
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'password',
      POSTGRES_DB: 'testdb'
    }
  };

  const env = {
    POSTGRES_USER: options.user || config.EnvDefaults.POSTGRES_USER,
    POSTGRES_PASSWORD: options.password || config.EnvDefaults.POSTGRES_PASSWORD,
    POSTGRES_DB: options.database || config.EnvDefaults.POSTGRES_DB,
    ...options.additionalEnv
  };

  return {
    Image: config.Image,
    ExposedPorts: config.Ports,
    HostConfig: {
      PortBindings: {
        '5432/tcp': [{ HostPort: options.port || '5432' }]
      }
    },
    Env: Object.entries(env).map(([key, value]) => `${key}=${value}`)
  };
}
