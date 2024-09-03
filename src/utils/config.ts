import { ContainerConfig, ContainerOptions, GetContainerConfigOptions } from "../types";

const containerConfigs: Record<string, ContainerConfig> = {
  postgres: {
    Image: 'bitnami/postgresql:latest',
    Ports: {
      '5432/tcp': {}
    },
    EnvDefaults: {
      POSTGRES_USER: 'postgres',
      POSTGRES_PASSWORD: 'password',
      POSTGRES_DB: 'testdb'
    }
  },
  mysql: {
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
  },
  redis: {
    Image: 'redis:latest',
    Ports: {
      '6379/tcp': {}
    },
    EnvDefaults: {}
  },
  mongo: {
    Image: 'mongo:latest',
    Ports: {
      '27017/tcp': {}
    },
    EnvDefaults: {}
  }
};

export function getContainerConfig({ image, envVars, port }: GetContainerConfigOptions): ContainerOptions {
  const config = containerConfigs[image];

  if (!config) {
    throw new Error(`Unsupported container image: ${image}`);
  }

  const baseConfig: ContainerOptions = {
    ExposedPorts: config.Ports,
    HostConfig: {
      PortBindings: {
        [`${port || Object.keys(config.Ports)[0]}`]: [{ HostPort: port || '0' }]
      }
    },
    Image: config.Image,
    Env: [
      ...Object.entries(config.EnvDefaults).map(([key, value]) => `${key}=${envVars[key] || value}`),
      ...envVars.additionalEnv || []
    ]
  };

  return baseConfig;
}
