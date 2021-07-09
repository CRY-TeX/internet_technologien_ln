// implement context into bot class
// we need some way to construct the right interface for given question / intent
// should responses be saved in array etc...

import fetch, { Response as FetchResponse } from 'node-fetch';

import { BotResponse, BotResponseFactory } from './response/bot_response';
import { IResponseData } from './data_interfaces/api_response_data';
import { ILuisResponseData } from './data_interfaces/luis_response';

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

type BotResponseHandler = (response: IResponseData) => void;

export default class Bot {
  // TODO: fix any later
  private async fetch_luis(msg: string): Promise<ILuisResponseData | null> {
    try {
      const res: FetchResponse = await fetch(`${LUIS_ENDPONT}${msg}`);
      return (await res.json()) as ILuisResponseData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get_response(msg: string, callback: BotResponseHandler): Promise<void> {
    // construct response
    try {
      // get luis response
      const luis_res: ILuisResponseData | null = await this.fetch_luis(msg);
      if (luis_res === null) throw new Error('Could not fetch luis response');

      const bot_response = BotResponseFactory.make_response(luis_res);
      // TODO: remove when always creating not understood handler
      if (bot_response === null) throw new Error('could not build response according to parameters');

      bot_response.set_input_data(luis_res);
      bot_response.analyze_data();

      const response_data: IResponseData | null = bot_response.get_response_data();
      if (response_data === null) throw new Error('could not get valid response data');

      // pass response data to callback function
      callback(response_data);
    } catch (error) {
      console.error(error);
    }
  }
}
