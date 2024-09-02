import Docker from 'dockerode';
import { createContainerCommand } from './src/commands/create-container';
import { stopContainer } from './src/services/stop-container';
import { removeContainer } from './src/services/remove-container';

const docker = new Docker();

async function parseArgs() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'create':
      await handleCreateCommand(args.slice(1));
      break;
    case 'stop':
      await handleStopCommand(args.slice(1));
      break;
    case 'remove':
      await handleRemoveCommand(args.slice(1));
      break;
    default:
      console.error(`Unknown command: ${command}`);
      showHelp();
      break;
  }
}

async function handleCreateCommand(args: string[]) {
  const type = args[0];
  const port = args.includes('--port') ? args[args.indexOf('--port') + 1] : undefined;
  const envIndex = args.indexOf('--env');
  const envVars: any = {};

  if (envIndex !== -1) {
    args.slice(envIndex + 1).forEach(env => {
      const [key, value] = env.split('=');
      envVars[key] = value;
    });
  }

  try {
    const container = await createContainerCommand(type, envVars, port);
    console.log(`${type} container started with ID: ${container.id}`);
  } catch (error) {
    console.error(`Error creating ${type} container:`, error);
  }
}

async function handleStopCommand(args: string[]) {
  const containerId = args[0];
  const container = docker.getContainer(containerId);

  try {
    await stopContainer(container);
    console.log(`Container ${containerId} stopped.`);
  } catch (error) {
    console.error(`Error stopping container ${containerId}:`, error);
  }
}

async function handleRemoveCommand(args: string[]) {
  const containerId = args[0];
  const container = docker.getContainer(containerId);

  try {
    await removeContainer(container);
    console.log(`Container ${containerId} removed.`);
  } catch (error) {
    console.error(`Error removing container ${containerId}:`, error);
  }
}

function showHelp() {
  console.log(`
Usage:
  create <type> [--port <port>] [--env <key=value> ...]   Create and start a container
  stop <containerId>                                   Stop a container
  restart <containerId>                                Restart a container
  remove <containerId>                                Remove a container
  `);
}

parseArgs();
