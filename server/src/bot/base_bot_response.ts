import { IApiResponse } from '../types/api_response_data.interface';
import { ILuisData } from '../types/luis_data.interface';
import { matches_schema } from '../util/util';

export default abstract class BaseBotResponse {
  private static ID: number = 0;
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

  protected response_boilerplate(): { id: number; query: string } {
    BaseBotResponse.ID++;
    return {
      id: BaseBotResponse.ID,
      query:
        this.luis_data.query === undefined
          ? 'Upps, etwas ist schiefgelaufen... Keine Nachricht gefunden'
          : this.luis_data.query,
    };
  }

  // ABSTRACT METHODS
  public abstract analyze_data(): void;
}
