import { ILuisData } from '../types/luis_data.interface';
import BaseBotResponse from './base_bot_response';
import {
  HelpBotResponse,
  FoodOfTheDayBotResponse,
  RegionalBotResponse,
  LunchBotResponse,
  NoneBotResponse,
  RandomFoodBotResponse,
} from './bot_responses';

export class BotResponseFactory {
  private context: BaseBotResponse[] = [];
  public readonly response_class_names = [
    RandomFoodBotResponse,
    HelpBotResponse,
    FoodOfTheDayBotResponse,
    RegionalBotResponse,
    LunchBotResponse,
    NoneBotResponse,
  ];

  public async make_bot_response(luis_data: ILuisData): Promise<BaseBotResponse | null> {
    let bot_response: BaseBotResponse | null = null;

    // figure out the right bot response class
    for (const class_type of this.response_class_names) {
      try {
        // check if any reponse class fits the luis input data
        bot_response = new class_type(luis_data, this.context);
        if (bot_response.fits_input(luis_data)) break;
        else bot_response = null;
      } catch (error) {
        console.error(error);
      }
    }

    // no reponse was found
    if (bot_response === null) bot_response = new NoneBotResponse(luis_data, this.context);

    // analyze data
    await bot_response.analyze_data();

    // add to context
    this.context.push(bot_response);
    return bot_response;
  }
}
