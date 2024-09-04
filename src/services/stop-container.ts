import Docker from "dockerode";

const docker = new Docker()

export async function stopContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.stop();
  } catch (error) {
    console.error('Error stopping container:', error);
    throw error;
  }
}