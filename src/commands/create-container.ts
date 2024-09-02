import Docker from 'dockerode';
import type { ContainerOptions } from '../types';
import { getContainerConfig } from '../utils/config';

const docker = new Docker();

export async function createContainer(options: ContainerOptions) {
  const container = await docker.createContainer(options);
  return container;
}

export async function startContainer(container: Docker.Container) {
  await container.start();
}

export async function createContainerCommand(type: string, envVars: any, port?: string) {
  const containerOptions = getContainerConfig({ type, envVars, port });

  try {
    const container = await createContainer(containerOptions);
    await startContainer(container);

    console.log(`${type} container started successfully.`);
    return container;
  } catch (error) {
    console.error(`Error creating ${type} container:`, error);
    throw error;
  }
}
