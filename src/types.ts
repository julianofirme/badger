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

export type ContainerOptions = {
  ExposedPorts: {
    [key: string]: {};
  };
  HostConfig: {
    PortBindings: {
      [key: string]: {
        HostPort: string;
      }[];
    };
  };
  Image: string;
  Env: string[];
}
