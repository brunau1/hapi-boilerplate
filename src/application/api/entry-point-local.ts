require('dotenv').config();

import 'reflect-metadata';

import {Configuration} from '../configuration/configuration';
import {Application} from './app';

(async () => {
  try {
    const configuration = await Configuration.make();
    const application = new Application(configuration);
    const server = await application.createServer();

    await server.start();

    console.log(`Server running at: ${server.info.uri}`);
  } catch (error) {
    console.log(`Error starting server: ${error}`);
  }
})();
