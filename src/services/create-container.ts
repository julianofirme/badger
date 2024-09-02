import Docker from 'dockerode';
import type { ContainerOptions } from '../types';

const docker = new Docker();

export async function createContainer(options: ContainerOptions) {
  try {
    const container = await docker.createContainer(options);
    return container;
  } catch (error) {
    console.error('Error creating container:', error);
    throw error;
  }
}