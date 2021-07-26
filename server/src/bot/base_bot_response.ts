import { IApiResponse } from '../types/api_response_data.interface';
import { ILuisData } from '../types/luis_data.interface';
import { matches_schema, rand_slice } from '../util/util';
import fs from 'fs';
import { path as root_path } from 'app-root-path';
import path from 'path';

export default abstract class BaseBotResponse {
  private static ID: number = 0;
  abstract readonly SCHEMA: ILuisData;

  protected luis_data: ILuisData;
  protected response_data: IApiResponse | null;
  protected context: BaseBotResponse[];

  protected static data: object;
  protected static _read_data = (() => {
    try {
      const content: string = fs.readFileSync(path.join(root_path, '/data/bot_response.json'), 'utf8');
      BaseBotResponse.data = JSON.parse(content);
    } catch (error) {
      console.error(error);
      BaseBotResponse.data = {};
    }
  })();

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

  protected response_boilerplate(): { id: number; query: string; suggestions: string[] } {
    BaseBotResponse.ID++;
    return {
      id: BaseBotResponse.ID,
      query:
        this.luis_data.query === undefined
          ? 'Upps, etwas ist schiefgelaufen... Keine Nachricht gefunden'
          : this.luis_data.query,
      suggestions: rand_slice(BaseBotResponse.get_data()?.suggestions),
    };
  }

  public static get_data(): any {
    return BaseBotResponse.data;
  }

  // ABSTRACT METHODS
  public abstract analyze_data(): void;
}
