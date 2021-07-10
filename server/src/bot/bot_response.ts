import { IApiResponse } from './data_interfaces/api_response_data';
import { ILuisData } from './data_interfaces/luis_data';
import { compare_schema } from './util/util';

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
    return compare_schema(this.SCHEMA, luis_data);
  }

  // ABSTRACT METHODS
  public abstract analyze_data(): void;
}
