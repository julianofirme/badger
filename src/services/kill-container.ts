import Docker from "dockerode";

const docker = new Docker()

export async function killContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.kill();
  } catch (error) {
    console.error('Error stopping container:', error);
    throw error;
  }
}