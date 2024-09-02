export interface ContainerConfig {
  Image: string;
  Ports: {
    [key: string]: {};
  };
  EnvDefaults: {
    [key: string]: string;
  };
}

export interface GetContainerConfigOptions {
  type: string;
  envVars: any;
  port?: string;
}

export interface ContainerOptions {
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
