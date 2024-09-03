import Docker from 'dockerode';
import { getContainerConfig } from '../utils/config';
import { GetContainerConfigOptions } from '../types';

const docker = new Docker();

export async function createContainer({ image, envVars, port }: GetContainerConfigOptions) {
  const containerOptions = getContainerConfig({ image, envVars, port });

  try {
    const container = await docker.createContainer(containerOptions);
    return container;
  } catch (error) {
    console.error('Error creating container:', error);
    throw error;
  }
}