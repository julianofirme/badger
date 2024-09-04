import Docker, { ContainerCreateOptions } from 'dockerode';

const docker = new Docker();

export async function createRedisContainer(config: {
  host?: string;
  port?: string;
  password?: string;
}) {
  const containerOptions: ContainerCreateOptions = {
    Image: 'redis:latest',
    Env: config.password ? [`REDIS_PASSWORD=${config.password}`] : [],
    HostConfig: {
      PortBindings: {
        '6379/tcp': [{ HostPort: config.port || '6379' }]
      }
    }
  };

  const container = await docker.createContainer(containerOptions);
  await container.start();

  const host = config.host || 'localhost';
  const port = config.port || '6379';
  const password = config.password || '';

  return {
    getConnectionString: () =>
      password
        ? `redis://:${password}@${host}:${port}`
        : `redis://${host}:${port}`,
    getPort: () => port,
    getPassword: () => password,
    getContainerId: (): string => container.id,
  };
}
