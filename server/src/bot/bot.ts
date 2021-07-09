import fetch, { Response as FetchResponse } from 'node-fetch';

import { IApiResponse } from './data_interfaces/api_response_data';
import { ILuisResponse } from './data_interfaces/luis_response';

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

type BotResponseHandler = (response: IApiResponse) => void;

export default class Bot {
  // TODO: fix any later
  private async fetch_luis(msg: string): Promise<ILuisResponse | null> {
    try {
      const res: FetchResponse = await fetch(`${LUIS_ENDPONT}${msg}`);
      return (await res.json()) as ILuisResponse;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async get_response(msg: string, callback: BotResponseHandler): Promise<void> {
    // construct response
    try {
      // get luis response
      const luis_res: ILuisResponse | null = await this.fetch_luis(msg);
      if (luis_res === null) throw new Error('Could not fetch luis response');

      const response_data = {} as IApiResponse;
      // pass response data to callback function
      callback(response_data);
    } catch (error) {
      console.error(error);
    }
  }
}
