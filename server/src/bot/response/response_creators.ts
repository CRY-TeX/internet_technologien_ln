import { BaseInformationExtractor, IntentExtractor, PhraseListExtractor } from './information_extractors';

import { IIntent } from '../data_interfaces/adaptor_data_objs';
import { IResponseData } from '../data_interfaces/api_response_data';

export abstract class BaseResponseCreator {
  // TODO: fix type
  private response_data: IResponseData | null = null;

  public abstract is_compatible<T extends BaseInformationExtractor>(information_extractor: T): boolean;

  protected abstract return_response<T extends BaseInformationExtractor>(information_extractor: T): IResponseData;

  // TODO: fix object type
  public static fits_input(input_data: object): boolean {
    return false;
  }

  public create_response<T extends BaseInformationExtractor>(information_extractor: T): void {
    if (!this.is_compatible(information_extractor))
      throw new TypeError(
        `${BaseInformationExtractor.name} "${information_extractor.constructor.name}" is not compatible with ${BaseResponseCreator.name}"`
      );

    this.response_data = this.return_response(information_extractor);
  }

  public get_response_data(): IResponseData | null {
    return this.response_data; // json_obj
  }
}

export class NoneResponseCreator extends BaseResponseCreator {
  public static readonly INTENT = 'None';
  public static readonly ANSWERS = [
    'Entschuldigen Sie, ich habe sie nicht verstanden.',
    'Können sie das bitte nochmal wiederholen',
    'Ich konnte sie leider nicht verstehen.',
    'Wie bitte?',
  ];

  public is_compatible<T extends BaseInformationExtractor>(information_extractor: T): boolean {
    return information_extractor.constructor === IntentExtractor;
  }

  protected return_response<T extends BaseInformationExtractor>(information_extractor: T): IResponseData {
    // TODO: change if luis also recognizes entities in None intent
    // return this.#answers[Math.random() * this.#answers.length];
    const res: IResponseData = {
      answer_message: {
        message: NoneResponseCreator.ANSWERS[Math.random() * NoneResponseCreator.ANSWERS.length],
      },
    };

    return res;
  }

  // TODO: fix type
  public static fits_input(input_data: any): boolean {
    return input_data?.prediction?.topIntent === NoneResponseCreator.INTENT;
  }
}

export class LunchResponseCreator extends BaseResponseCreator {
  public static readonly INTENT = 'want-food';
  public static readonly DOMAIN = 'menu-type';
  public static readonly ENTITY = 'Mittagessen';

  public static readonly REQUIRED_SCORE = 0.8;
  public static readonly UNDER_SCORE_ANSWERS = [
    'Ich konnte sie leider nicht genau verstehen. Wollen sie ein Mittagessen kochen?',
  ];
  public static readonly ANSWERS = [
    'Was für eine Art von Mittagessen stellen Sie sich denn vor?',
    'Haben Sie eine bestimmte Vorstellung?',
  ];
  public static readonly SUGGESTIONS = [];

  public is_compatible<T extends BaseInformationExtractor>(information_extractor: T): boolean {
    return information_extractor.constructor === PhraseListExtractor;
  }

  protected return_response<T extends BaseInformationExtractor>(information_extractor: T): IResponseData {
    // FIXME: handle what happens on null case
    const extracted_data: any = information_extractor.get_extracted_data() as object;

    if (extracted_data.score < LunchResponseCreator.REQUIRED_SCORE) {
      return {
        answer_message: {
          message:
            LunchResponseCreator.UNDER_SCORE_ANSWERS[Math.random() * LunchResponseCreator.UNDER_SCORE_ANSWERS.length],
        },
      };
    } else {
      return {
        answer_message: {
          message: LunchResponseCreator.ANSWERS[Math.floor(Math.random() * LunchResponseCreator.ANSWERS.length)],
        },
      };
    }
  }

  public static fits_input(input_data: any): boolean {
    return (
      input_data?.prediction?.topIntent === LunchResponseCreator.INTENT &&
      input_data?.prediction?.entities?.[LunchResponseCreator.DOMAIN]?.[0]?.[LunchResponseCreator.ENTITY] !== undefined
    );
  }
}
