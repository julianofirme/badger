import Docker from "dockerode";
import logger from "../logger";

const docker = new Docker();

export async function startContainerWithDelayStrategy(containerId: string, DELAY: number) {
  try {
    const container = docker.getContainer(containerId);
    
    await container.start();
    logger.info("Container start command issued.");
    logger.info(`Wait ${DELAY}ms`);

    await delay(DELAY);
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Error in startContainerWithDelayStrategy: ${error.message}`);
    } else {
      logger.error("An unknown error occurred.");
    }
    throw error;
  }
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
