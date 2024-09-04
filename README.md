# Badger 🦡

Docker Container Management for Tests

### Overview

Badger is a tool designed for managing Docker containers for tests. The project is currently under development, and the goal is to publish it on npm, allowing users to incorporate container management functionalities directly into their applications.

## Usage in Code

Once Badger is published, you will be able to use its functions in your codebase. Here’s an example of how to integrate Badger into your tests:

```javascript
import {createPostgresContainer, stopContainer, removeContainer} from "badger";

let containerId: string | null = null;

beforeAll(async () => {
  try {
    const postgresContainer = await createPostgresContainer();

    const connectionString = postgresContainer.getConnectionString();
    const user = postgresContainer.getUser();
    const password = postgresContainer.getPassword();
    const db = postgresContainer.getDb();
    const port = postgresContainer.getPort();

    containerId = postgresContainer.getContainerId();

    console.log(`PostgreSQL container started with ID: ${containerId}`);
  } catch (error) {
    console.error("Error creating container:", error);
    throw error;
  }
});

afterAll(async () => {
  if (containerId) {
    try {
      await stopContainer(containerId);
      console.log(`PostgreSQL container ${containerId} stopped.`);

      await removeContainer(containerId);
      console.log(`PostgreSQL container ${containerId} removed.`);
    } catch (error) {
      console.error("Error managing container during cleanup:", error);
    }
  }
});
```

## Development and Contribution

The project is currently under development, and contributions are welcome. If you have suggestions, improvements, or would like to help with development, please reach out or open a pull request.
