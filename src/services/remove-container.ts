import type { Container } from "dockerode";

export async function removeContainer(container: Container) {
  try {
    await container.remove();
  } catch (error) {
    console.error('Error removing container:', error);
    throw error;
  }
}