import { IApiResponse } from './data_interfaces/api_response_data';
import { ILuisData } from './data_interfaces/luis_data';
import { matches_schema } from './util/util';

export abstract class BaseBotResponse {
  abstract readonly SCHEMA: ILuisData;

  protected luis_data: ILuisData;
  protected response_data: IApiResponse | null;
  protected context: BaseBotResponse[];

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    this.luis_data = luis_data;
    this.context = context;
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

export class NoneBotResponse extends BaseBotResponse {
  SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    super(luis_data, context);

    this.SCHEMA = {
      prediction: {
        topIntent: 'None',
      },
    };
  }

  public analyze_data(): void {
    if (this.context[this.context.length - 1] instanceof LunchBotResponse) {
      this.response_data = {
        answer_message: {
          message: 'Welche Art von Mittagessen wollen Sie zubereiten?',
        },
      };
    } else {
      this.response_data = {
        answer_message: {
          message: 'Ich konnte sie nicht richtig verstehen. Können Sie das bitte wiederholen?',
        },
      };
    }
  }
}

export class LunchBotResponse extends BaseBotResponse {
  public readonly SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    super(luis_data, context);

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
