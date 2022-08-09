import type { ProjectConfig, RawProjectConfig } from 'src/types/config';

export default function parseConfig(config: RawProjectConfig): ProjectConfig {
  // override default values
  return {
    client: {
      host: config.client.host ?? '0.0.0.0',
      port: config.client.port ?? 3000,
      strictPort: config.client.strictPort ?? false,
    },
    server: {
      root: config.server.root ?? 'http://localhost:8083',
    },
  } as ProjectConfig;
}
