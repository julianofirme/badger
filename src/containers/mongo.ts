import Docker from 'dockerode';
import { ContainerCreateOptions } from 'dockerode';

const docker = new Docker();

export async function createMongoContainer(config: {
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  db?: string;
}) {
  const containerOptions: ContainerCreateOptions = {
    Image: 'mongo:latest',
    Env: [
      `MONGO_INITDB_ROOT_USERNAME=${config.user || 'root'}`,
      `MONGO_INITDB_ROOT_PASSWORD=${config.password || 'password'}`,
      `MONGO_INITDB_DATABASE=${config.db || 'testdb'}`
    ],
    HostConfig: {
      PortBindings: {
        '27017/tcp': [{ HostPort: config.port || '27017' }]
      }
    }
  };

  const container = await docker.createContainer(containerOptions);
  await container.start();

  const host = config.host || 'localhost';
  const port = config.port || '27017';
  const user = config.user || 'root';
  const password = config.password || 'password';
  const db = config.db || 'testdb';

  return {
    getConnectionString: () => `mongodb://${user}:${password}@${host}:${port}/${db}`,
    getPort: () => port,
    getUser: () => user,
    getPassword: () => password,
    getDb: () => db,
    getContainerId: (): string => container.id,
  };
}
