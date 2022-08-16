import musichubConfig from '~/../musichub.config.js';
import type { ProjectConfig, RawProjectConfig } from 'src/types/config';

export default function parseConfig(config: RawProjectConfig): ProjectConfig {
  // override default values
  const cfg: Record<string, any> = {
    client: {
      host: config.client.host ?? '0.0.0.0',
      port: config.client.port ?? 3000,
      strictPort: config.client.strictPort ?? false,
    },
    server: {
      root: config.server.root ?? 'http://localhost:8083',
    },
  };

  // set `client.root` field
  cfg.client.root = `http://${cfg.client.host === '0.0.0.0' ? 'localhost' : cfg.client.host}:${cfg.client.port}`;

  return cfg as ProjectConfig;
}

export const projectConfig = parseConfig(musichubConfig);
