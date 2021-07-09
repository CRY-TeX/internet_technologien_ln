import { SimpleIntent, PhraseListData } from './adaptor_data_objs';

// FIXME: there is propably a better way to do this | if not move this to adaptor_data_objs
type IntentType = SimpleIntent | PhraseListData;

export abstract class BaseInformationExtractor {
  // FIXME: any type
  protected input_data: any = null;
  protected extracted_data: IntentType | null = null;

  // FIXME: interface
  public abstract extract_data(): void;

  public set_input_data(input_data: object): void {
    this.input_data = input_data;
  }

  public get_input_data(): object | null {
    return this.input_data;
  }

  public get_extracted_data(): IntentType | null {
    return this.extracted_data;
  }

  protected get_top_intent(): string | null {
    return this.input_data === null
      ? null
      : this.input_data?.prediction?.topIntent;
  }

  protected get_top_intent_score(): number | null {
    return this.input_data === null
      ? null
      : this.input_data.prediction.intents[this.input_data.prediction.topIntent]
          .score;
  }
}

export class IntentExtractor extends BaseInformationExtractor {
  public extract_data(): void {
    try {
      if (this.input_data.prediction.topIntent === undefined)
        throw new TypeError('topIntent is undefined');

      // FIXME: handle null case
      this.extracted_data = {
        intent: super.get_top_intent() as string,
        score: super.get_top_intent_score() as number,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export class PhraseListExtractor extends BaseInformationExtractor {
  public extract_data(): void {
    try {
      if (this.input_data.prediction.topIntent === undefined)
        throw new TypeError('topIntent is undefined');

      const category = Object.keys(this.input_data.prediction.entities)[0];
      const entity = Object.keys(
        this.input_data.prediction.entities[category]
      )[0];

      // FIXME: handle null case
      this.extracted_data = {
        intent: super.get_top_intent() as string,
        score: super.get_top_intent_score() as number,
        category: category,
        entity: entity,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
