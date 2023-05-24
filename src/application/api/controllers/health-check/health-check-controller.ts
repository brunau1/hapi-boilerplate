import {
  ReqRefDefaults,
  Request,
  ResponseToolkit,
  ServerRoute,
} from '@hapi/hapi';
import {Controller, controller, get, options, post} from 'hapi-decorators';
import * as Joi from 'joi';

import {JsonPresenter} from '../../presenters/json/json-presenter';
import {TestingPayloadDto} from './dtos/testing-payload-dto';

@controller('/health-check')
export class HealthCheckController implements Controller {
  readonly baseUrl: string;
  readonly routes: () => ServerRoute<ReqRefDefaults>[];

  constructor(private readonly jsonPresenter: JsonPresenter) {}

  @get('/')
  async healthCheckRoute(request: Request, reply: ResponseToolkit) {
    const payload = this.jsonPresenter.envelope({
      status: 'ok',
    });

    return reply.response(payload).code(200);
  }

  @get('/{id}')
  @options({
    validate: {
      params: Joi.object().keys({
        id: Joi.string().required(),
      }),
    },
  })
  async testingParamsRoute(request: Request, reply: ResponseToolkit) {
    const payload = this.jsonPresenter.envelope({
      status: 'ok',
      id: request.params.id,
    });

    return reply.response(payload).code(200);
  }

  @get('/testing-query')
  @options({
    validate: {
      query: Joi.object().keys({
        id: Joi.string().required(),
      }),
    },
  })
  async testingQueryRoute(request: Request, reply: ResponseToolkit) {
    const payload = this.jsonPresenter.envelope({
      status: 'ok',
      id: request.query.id,
    });

    return reply.response(payload).code(200);
  }

  @post('/testing-payload')
  @options({
    validate: {
      payload: Joi.object().keys({
        id: Joi.string().required(),
      }),
    },
  })
  async testingPayloadRoute(
    request: TestingPayloadDto,
    reply: ResponseToolkit
  ) {
    const payload = this.jsonPresenter.envelope({
      status: 'ok',
      id: request.payload.id,
    });

    return reply.response(payload).code(200);
  }
}
