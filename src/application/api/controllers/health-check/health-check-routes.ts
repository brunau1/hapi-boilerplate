import {Server} from '@hapi/hapi';

import {PresentersFactory} from '../../presenters/presenters-factory';
import {HealthCheckController} from './health-check-controller';

export class HealthCheckRouter {
  static registerRoutes(server: Server) {
    const jsonPresenter = PresentersFactory.makeJsonPresenter();
    const healthCheckController = new HealthCheckController(jsonPresenter);

    server.route(healthCheckController.routes());
  }
}
