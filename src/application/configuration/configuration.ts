import {
  Environment,
  EnvironmentFactory,
  NumberEnvPresenter,
  TextEnvPresenter,
} from '@heronlabs/presenter-env';
import {Inject} from '@nestjs/common';

import {EnvironmentConfiguration} from './interfaces/environment-configuration';

export class Configuration implements EnvironmentConfiguration {
  constructor(
    @Inject(NumberEnvPresenter)
    private readonly numberEnvPresenter: Environment<number>,
    @Inject(TextEnvPresenter)
    private readonly textEnvPresenter: Environment<string>
  ) {}

  server = {
    env: this.textEnvPresenter.getValueByKey('NODE_ENV'),
    port: this.numberEnvPresenter.getValueByKey('PORT'),
    host: this.textEnvPresenter.getValueByKey('HOST'),
  };

  static async make(): Promise<EnvironmentConfiguration> {
    const factory = await EnvironmentFactory.make();
    const numberEnvPresenter = factory.makeNumber();
    const textEnvPresenter = factory.makeText();

    return new Configuration(numberEnvPresenter, textEnvPresenter);
  }
}
