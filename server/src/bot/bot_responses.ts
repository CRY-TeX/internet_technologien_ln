import BaseBotResponse from './base_bot_response';
import { ILuisData } from '../types/luis_data.interface';

import {
  recipe_of_the_day,
  MeatPref,
  random_recipe,
  Category,
  build_search_url,
  query_recipes,
} from '../util/chefkoch_scrape';
import { IMealItem } from '../types/api_response_data.interface';
import { rand_choice, rand_slice } from '../util/util';

export class NoneBotResponse extends BaseBotResponse {
  public readonly SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    super(luis_data, context);

    this.SCHEMA = {
      prediction: {
        topIntent: 'None',
      },
    };
  }

  public async analyze_data(): Promise<void> {
    const last_context_item: BaseBotResponse | undefined = this.context[this.context.length - 1];

    this.response_data = {
      ...this.response_boilerplate(),
      answer_message: {
        msg: rand_choice(BaseBotResponse.get_data()?.intents?.None?.answers),
      },
    };
  }
}

export class FoodOfTheDayBotResponse extends BaseBotResponse {
  public readonly SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    super(luis_data, context);
    this.SCHEMA = {
      prediction: {
        topIntent: 'food-of-the-day',
      },
    };
  }

  public async analyze_data(): Promise<void> {
    const entities: any = this.luis_data?.prediction?.entities;
    let meat_pref: MeatPref = MeatPref.NO_PREF;
    if (Object.keys(entities).length > 0) {
      const keys = Object.keys(entities?.['meat-preference']?.[0]);
      if (keys === undefined) meat_pref = MeatPref.NO_PREF;
      else if (keys.includes('vegan')) meat_pref = MeatPref.VEGAN;
      else if (keys.includes('vegetarian')) meat_pref = MeatPref.VEGETARIAN;
    }

    this.response_data = {
      ...this.response_boilerplate(),
      answer_message: {
        msg: `Hier ist das Essen des Tages. ${meat_pref !== MeatPref.NO_PREF ? `(${meat_pref})` : ''}`,
        meal_item: (await recipe_of_the_day(meat_pref)) as IMealItem,
      },
    };
  }
}

export class RandomFoodBotResponse extends BaseBotResponse {
  public readonly SCHEMA: ILuisData;

  public constructor(luis_data: ILuisData, context: BaseBotResponse[]) {
    super(luis_data, context);
    this.SCHEMA = {
      prediction: {
        topIntent: 'random-food',
      },
    };
  }

  public async analyze_data(): Promise<void> {
    this.response_data = {
      ...this.response_boilerplate(),
      answer_message: {
        msg: 'Hier ist ein zufälliges Essen',
        meal_item: (await random_recipe()) as IMealItem,
      },
    };
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
          'menu-type': '*',
        },
      },
    };
  }

  public async analyze_data(): Promise<void> {
    const menu_type: any = (this.luis_data?.prediction?.entities as any)?.['menu-type']?.[0];
    if (menu_type === undefined) {
      this.response_data = {
        ...this.response_boilerplate(),
        answer_message: {
          msg: 'Was für eine Art von Essen möchten Sie denn haben?',
        },
        suggestions: [
          'Ich möchte ein Mittagessen kochen',
          'Ich möchte etwas amerikanisches machen',
          'Ich will eine Beilage machen',
        ],
      };
    } else {
      let category: Category | null = null;
      const keys: string[] = Object.keys(menu_type);

      // handle menu-type
      if (keys.includes('Frühstück')) category = { id: 's0g31', html_file: 'Fruehstuecksrezepte.html' };
      else if (keys.includes('Vorspeise')) category = { id: 's0g2', html_file: 'Vorspeisen-Rezepte.html' };
      else if (keys.includes('Mittagessen')) category = { id: 's0g9', html_file: 'Hauptspeisen-Rezepte.html' };
      else if (keys.includes('Dessert')) category = { id: 's0g19', html_file: 'Dessert-Rezepte.html' };
      else if (keys.includes('Beilage')) category = { id: 's0g26', html_file: 'Beilagen-Rezepte.html' };

      const search_url = category === null ? build_search_url('') : build_search_url('', category);
      const meal_items: IMealItem[] | null = await query_recipes(search_url);

      if (meal_items !== null && meal_items?.length > 0) {
        this.response_data = {
          ...this.response_boilerplate(),
          answer_message: {
            msg: 'Ich habe folgenden Vorschlag für Sie finden können',
            meal_item: meal_items[0],
          },
          meal_list: meal_items,
        };
      } else {
        this.response_data = {
          ...this.response_boilerplate(),
          answer_message: {
            msg: 'Ich konnte Ihnen leider keine passenden Rezepte finden.',
          },
        };
      }
    }
  }
}
