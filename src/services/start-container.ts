import Docker from "dockerode";

const docker = new Docker()

export async function startContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.start();
  } catch (error) {
    console.error('Error starting container:', error);
    throw error;
  }
}