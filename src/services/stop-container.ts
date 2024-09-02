import type { Container } from "dockerode";

export async function stopContainer(container: Container) {
  try {
    await container.stop();
  } catch (error) {
    console.error('Error stopping container:', error);
    throw error;
  }
}