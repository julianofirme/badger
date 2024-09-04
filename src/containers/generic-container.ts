import Docker, { ContainerCreateOptions } from 'dockerode';

const docker = new Docker();

interface CreateGenericContainerConfig {
  image: string;
  envs?: Record<string, string>;
  port?: string;
  hostPort?: string;
}

export async function createGenericContainer(config: CreateGenericContainerConfig) {
  const envVariables = config.envs ? 
    Object.entries(config.envs).map(([key, value]) => `${key}=${value}`) : [];

  const containerOptions: ContainerCreateOptions = {
    Image: config.image,
    Env: envVariables,
    HostConfig: {
      PortBindings: {
        [`${config.port}/tcp`]: [{ HostPort: config.hostPort || config.port || '80' }]
      }
    }
  };

  const container = await docker.createContainer(containerOptions);
  await container.start();

  const host = 'localhost';
  const port = config.hostPort || config.port || '80';

  return {
    getContainerId: (): string => container.id,
    getPort: () => port,
    getEnv: (key: string) => config.envs?.[key] || '',
  };
}
