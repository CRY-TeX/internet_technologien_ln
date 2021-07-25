import fetch, { Response as FetchResponse } from 'node-fetch';

import { IApiResponse } from '../types/api_response_data.interface';
import { ILuisData } from '../types/luis_data.interface';
import { BotResponseFactory } from './bot_response_factory';
import BaseBotResponse from './base_bot_response';
import { rand_slice } from '../util/util';

type BotResponseHandler = (response: IApiResponse | null) => void;

export default class Bot {
  private bot_response_factory: BotResponseFactory;

  public static readonly LUIS_ENDPONT =
    'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

  public constructor() {
    this.bot_response_factory = new BotResponseFactory();
  }

  public get_inital(): IApiResponse {
    return {
      id: 0,
      query: '',
      answer_message: {
        msg: BaseBotResponse.get_data()?.inital_msg?.msg,
      },
      suggestions: rand_slice(BaseBotResponse.get_data()?.inital_msg?.suggestions),
    };
  }

  // TODO: fix any later
  private async fetch_luis(msg: string): Promise<ILuisData | null> {
    try {
      const res: FetchResponse = await fetch(`${Bot.LUIS_ENDPONT}${msg}`);
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

      const bot_response: BaseBotResponse | null = await this.bot_response_factory.make_bot_response(luis_data);
      if (bot_response === null) throw new Error('Could not create bot response');

      // pass response data to callback function
      callback(bot_response.get_response_data());
    } catch (error) {
      console.error(error);
    }
  }
}
