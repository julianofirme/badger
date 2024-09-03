import Docker from 'dockerode';
import { ContainerCreateOptions } from 'dockerode';

const docker = new Docker();

export async function createContainer(containerOptions: ContainerCreateOptions): Promise<Docker.Container> {
  try {
    const container = await docker.createContainer(containerOptions);
    return container;
  } catch (error) {
    console.error('Error creating container:', error);
    throw error;
  }
}
