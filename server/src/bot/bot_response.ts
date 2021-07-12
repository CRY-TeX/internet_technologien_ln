import { IApiResponse } from '../types/api_response_data.interface';
import { ILuisData } from '../types/luis_data.interface';
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
    const last_context_item: BaseBotResponse | undefined = this.context[this.context.length - 1];

    if (last_context_item instanceof LunchBotResponse) {
      this.response_data = {
        answer_message: {
          msg: 'Welche Art von Mittagessen wollen Sie zubereiten?',
        },
      };
    } else {
      this.response_data = {
        answer_message: {
          msg: 'Ich konnte sie nicht richtig verstehen. Können Sie das bitte wiederholen?',
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
        msg: 'Was für ein Mittagessen wollen Sie denn kochen?',
      },
    };
  }
}
