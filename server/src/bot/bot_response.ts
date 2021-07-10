import { IApiResponse } from './data_interfaces/api_response_data';
import { ILuisData } from './data_interfaces/luis_data';
import { matches_schema } from './util/util';

export abstract class BaseBotResponse {
  abstract readonly SCHEMA: ILuisData;

  protected luis_data: ILuisData;
  protected response_data: IApiResponse | null;

  public constructor(luis_data: ILuisData) {
    this.luis_data = luis_data;
    this.response_data = null;
  }

  public get_response_data(): IApiResponse | null {
    return this.response_data;
  }

  public fits_input(luis_data: ILuisData) {
    return matches_schema(this.SCHEMA, luis_data);
  }

  // ABSTRACT METHODS
  public abstract analyze_data(): void;
}

export class LunchResponse extends BaseBotResponse {
  public readonly SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData) {
    super(luis_data);

    this.SCHEMA = {
      prediction: {
        topIntent: 'want-food',
        entities: {
          'menu-type': [
            {
              Mittagessen: '*',
            },
          ],
        },
      },
    };
  }

  public analyze_data(): void {
    this.response_data = {
      answer_message: {
        message: 'Was für ein Mittagessen wollen Sie denn kochen?',
      },
    };
  }
}
