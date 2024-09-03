export type ContainerImage = "postgres" | "mysql" | "redis" | "mongo";

export type ContainerConfig = {
  Image: string;
  Ports: {
    [key: string]: {};
  };
  EnvDefaults: {
    [key: string]: string;
  };
}

export type GetContainerConfigOptions = {
  image: ContainerImage;
  envVars: {
    [key: string]: string;
  };
  port?: string;
}

export type PostgresOptions = {
  user?: string;
  password?: string;
  database?: string;
  port?: string;
  additionalEnv?: Record<string, string>;
}

export type MySQLOptions = {
  rootPassword?: string;
  database?: string;
  user?: string;
  password?: string;
  port?: string;
  additionalEnv?: Record<string, string>;
}
