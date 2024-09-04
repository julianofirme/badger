import Docker from "dockerode";

const docker = new Docker()

export async function removeContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.remove();
  } catch (error) {
    console.error('Error removing container:', error);
    throw error;
  }
}