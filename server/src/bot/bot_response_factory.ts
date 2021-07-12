import { ILuisData } from '../types/luis_data.interface';
import { BaseBotResponse, LunchBotResponse, NoneBotResponse } from './bot_response';

export class BotResponseFactory {
  private context: BaseBotResponse[] = [];
  public readonly response_class_names = [LunchBotResponse, NoneBotResponse];

  public make_bot_response(luis_data: ILuisData): BaseBotResponse | null {
    let bot_response: BaseBotResponse | null = null;

    // figure out the right bot response class
    for (const item of this.response_class_names) {
      try {
        // check if any reponse class fits the luis input data
        bot_response = new item(luis_data, this.context);
        if (bot_response.fits_input(luis_data)) break;
        else bot_response = null;
      } catch (error) {
        console.error(error);
      }
    }

    // no reponse was found
    if (bot_response === null) return null;

    // analyze data
    bot_response.analyze_data();

    // add to context
    this.context.push(bot_response);
    return bot_response;
  }
}
