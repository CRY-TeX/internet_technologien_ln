import { ILuisData } from './data_interfaces/luis_data';
import { BaseBotResponse, LunchResponse } from './bot_response';

export class BotResponseFactory {
  private static context: BaseBotResponse[] = [];
  public static readonly response_class_names = [LunchResponse];

  public static make_bot_response(luis_data: ILuisData): BaseBotResponse | null {
    let bot_response: BaseBotResponse | null = null;

    // figure out the right bot response class
    for (const item of this.response_class_names) {
      try {
        // check if any reponse class fits the luis input data
        bot_response = new item(luis_data);
        if (bot_response.fits_input(luis_data)) break;
        else bot_response = null;
      } catch (error) {
        console.error(error);
      }
    }

    // no reponse was found
    if (bot_response === null) return null;

    // add to context
    this.context.push(bot_response);

    // analyze data
    bot_response.analyze_data();
    return bot_response;
  }
}
