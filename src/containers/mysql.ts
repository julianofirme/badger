import Docker from 'dockerode';
import { ContainerCreateOptions } from 'dockerode';

const docker = new Docker();

export async function createMySQLContainer(config: {
  host?: string;
  port?: string;
  user?: string;
  password?: string;
  db?: string;
}) {
  const containerOptions: ContainerCreateOptions = {
    Image: 'mysql:latest',
    Env: [
      `MYSQL_ROOT_PASSWORD=${config.password || 'rootpassword'}`,
      `MYSQL_DATABASE=${config.db || 'testdb'}`,
      `MYSQL_USER=${config.user || 'user'}`,
      `MYSQL_PASSWORD=${config.password || 'password'}`
    ],
    HostConfig: {
      PortBindings: {
        '3306/tcp': [{ HostPort: config.port || '3306' }]
      }
    }
  };

  const container = await docker.createContainer(containerOptions);
  await container.start();

  const host = config.host || 'localhost';
  const port = config.port || '3306';
  const user = config.user || 'user';
  const password = config.password || 'password';
  const db = config.db || 'testdb';

  return {
    getConnectionString: () => `mysql://${user}:${password}@${host}:${port}/${db}`,
    getPort: () => port,
    getUser: () => user,
    getPassword: () => password,
    getDb: () => db,
  };
}
