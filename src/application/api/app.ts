import {Server} from '@hapi/hapi';

import {EnvironmentConfiguration} from '../configuration/interfaces/environment-configuration';
import {HealthCheckRouter} from './controllers/health-check/health-check-routes';

export class Application {
  constructor(private readonly configuration: EnvironmentConfiguration) {}

  private setupServerRoutes(server: Server) {
    HealthCheckRouter.registerRoutes(server);
  }

  async createServer(): Promise<Server> {
    const server = new Server({
      port: this.configuration.server.port,
      host: this.configuration.server.host,
    });

    server.realm.modifiers.route.prefix = '/api/v1';

    this.setupServerRoutes(server);

    return server;
  }
}
