import {Request} from '@hapi/hapi';

export interface TestingPayloadDto extends Request {
  payload: {
    id: string;
  };
}
