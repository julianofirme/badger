import Docker, { ContainerCreateOptions } from 'dockerode';
import { startContainer } from '../services/start-container';
import { startContainerWithDelayStrategy } from '../services/start-container-with-delay';

const docker = new Docker();

export async function createPostgresContainer(config: {
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  db?: string;
} = {}) {
  const containerOptions: ContainerCreateOptions = {
    Image: 'bitnami/postgresql:latest',
    Env: [
      `POSTGRES_USER=${config.user ?? 'test'}`,
      `POSTGRES_PASSWORD=${config.password ?? 'password'}`,
      `POSTGRES_DB=${config.db ?? 'testdb'}`
    ],
    HostConfig: {
      PortBindings: {
        '5432/tcp': [{ HostPort: config.port || '5432' }]
      }
    }
  };

  const container = await docker.createContainer(containerOptions);
  console.log("🚀 Container created, use container.start() or container.startWithDelay() now!")

  const host = config.host || 'localhost';
  const port = config.port || '5432';
  const user = config.user || 'postgres';
  const password = config.password || 'password';
  const db = config.db || 'testdb';

  return {
    getConnectionString: () => `postgresql://${user}:${password}@${host}:${port}/${db}`,
    getPort: () => port,
    getUser: () => user,
    getPassword: () => password,
    getDb: () => db,
    getContainerId: (): string => container.id,
    start: async () => startContainer(container.id),
    startWithDelay: async () => startContainerWithDelayStrategy(container.id)
  };
}
