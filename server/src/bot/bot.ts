// implement context into bot class
// we need some way to construct the right interface for given question / intent
// should responses be saved in array etc...

import fetch, { Response as FetchResponse } from 'node-fetch';
import fs from 'fs';
import path from 'path';

const { BotResponse, BotResponseFactory } = require('./response/bot_response');

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

type BotResponseHandler = (response: object) => void;

export default class Bot {
  private res_data: string | null;

  constructor() {
    // TODO: implement context
    try {
      const file_content: Buffer = fs.readFileSync(
        path.join(path.dirname(__filename), '../../data/bot_response.json')
      );
      this.res_data = JSON.parse(file_content as unknown as string);
    } catch (error) {
      console.error(error);
      this.res_data = null;
      throw new Error('unable to read response file data');
    }
  }

  // TODO: fix any later
  private async fetch_luis(msg: string): Promise<any> {
    try {
      const res: FetchResponse = await fetch(`${LUIS_ENDPONT}${msg}`);
      return await res.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get_response(
    msg: string,
    callback: BotResponseHandler
  ): Promise<void> {
    // construct response
    try {
      // get luis response
      const luis_res = await this.fetch_luis(msg);

      const bot_response = BotResponseFactory.make_response(luis_res);
      bot_response.set_input_data(luis_res);
      bot_response.analyze_data();

      // pass response data to callback function
      callback(bot_response.get_response_data());
    } catch (error) {
      console.error(error);
    }
  }
}
