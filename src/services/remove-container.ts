import Docker from "dockerode";
import logger from "../logger";

const docker = new Docker()

export async function removeContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.remove();
  } catch (error) {
    logger.error(`Error inspecting container: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}