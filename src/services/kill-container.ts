import Docker from "dockerode";
import logger from "../logger";

const docker = new Docker()

export async function killContainer(containerId: string) {
  try {
    const container = docker.getContainer(containerId)
    await container.kill();
    logger.info('Container killed')
  } catch (error) {
    logger.error(`Error inspecting container: ${error instanceof Error ? error.message : 'Unknown error'}`);
    throw error;
  }
}