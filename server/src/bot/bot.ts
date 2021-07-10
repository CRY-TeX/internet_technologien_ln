import fetch, { Response as FetchResponse } from 'node-fetch';

import { IApiResponse } from './data_interfaces/api_response_data';
import { ILuisData } from './data_interfaces/luis_data';
import { BotResponseFactory } from './bot_response_factory';
import { BaseBotResponse } from './bot_response';

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

type BotResponseHandler = (response: IApiResponse | null) => void;

export default class Bot {
  // TODO: fix any later
  private async fetch_luis(msg: string): Promise<ILuisData | null> {
    try {
      const res: FetchResponse = await fetch(`${LUIS_ENDPONT}${msg}`);
      return (await res.json()) as ILuisData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get_response(msg: string, callback: BotResponseHandler): Promise<void> {
    // construct response
    try {
      // get luis response
      const luis_data: ILuisData | null = await this.fetch_luis(msg);
      if (luis_data === null) throw new Error('Could not fetch luis response');

      const bot_response: BaseBotResponse | null = BotResponseFactory.make_bot_response(luis_data);
      if (bot_response === null) throw new Error('Could not create bot response');

      // pass response data to callback function
      callback(bot_response.get_response_data());
    } catch (error) {
      console.error(error);
    }
  }
}
