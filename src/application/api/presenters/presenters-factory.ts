import {JsonPresenter} from './json/json-presenter';

export class PresentersFactory {
  static makeJsonPresenter(): JsonPresenter {
    const jsonPresenter = new JsonPresenter();

    return jsonPresenter;
  }
}
