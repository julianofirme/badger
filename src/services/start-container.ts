import type { Container } from "dockerode";

export async function startContainer(container: Container) {
  try {
    await container.start();
  } catch (error) {
    console.error('Error starting container:', error);
    throw error;
  }
}