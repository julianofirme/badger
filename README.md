# Badger 🦡 
Docker Container Management for Tests

### Overview

Badger is a tool designed for managing Docker containers for tests. The project is currently under development, and the goal is to publish it on npm, allowing users to incorporate container management functionalities directly into their applications.

## Usage in Code (Future)

Once Badger is published, you will be able to use its functions in your codebase. Here’s an example of how to integrate Badger into your application:

```javascript
import { createContainer, stopContainer, removeContainer } from 'badger';

let containerId: string | null = null;

beforeAll(async () => {
  try {
    const container = await createContainer({
      container: 'postgres',
      customEnvs: {
        POSTGRES_USER: 'test_user',
        POSTGRES_PASSWORD: 'test_password',
        POSTGRES_DB: 'test_db'
      },
      port: '5432'
    });

    containerId = container.id;
    console.log(`PostgreSQL container started with ID: ${containerId}`);
  } catch (error) {
    console.error('Error creating container:', error);
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
      console.error('Error managing container during cleanup:', error);
    }
  }
});
```

## Testing Badger using CLI 

### Prerequisites

Ensure you have [Bun](https://bun.sh/) installed on your system. This project uses Bun for managing dependencies and running scripts.

### Clone the Repository

```bash
git clone https://github.com/julianofirme/badger
cd badger
```

### Install Dependencies

Run the following command to install all necessary packages:

```bash
bun install
```

### Run the CLI

You can test the CLI commands using the following examples:

Create a Container

```bash
bun index.ts create postgres --port 5432 --env POSTGRES_USER=test --env POSTGRES_PASSWORD=test --env POSTGRES_DB=mydb
```

Stop a Container

```bash
bun index.ts stop <containerId>
```

Remove a Container

```bash
bun index.ts remove <containerId>
```

## Development and Contribution
The project is currently under development, and contributions are welcome. If you have suggestions, improvements, or would like to help with development, please reach out or open a pull request.
