// interfaces need be implemented as classes in pure js
// interface needs to be able to analyze LUIS data
//  -> these interfaces dont fetch the LUIS data, but save it and work on it
// interface needs to be able to analyze my response data

// these 2 functionalities should be implemented in a class for logic and data exchange
//  -> class extends interfaces
//  -> this class should be as much abstracted into the interfaces as possible
//  -> it would be awesome if the filter logic is also abstracted into interface classes
//  -> class needs to return one method (abstract and overridable) for the bot to fetch the response

// should this class also handle fetching the data from chefkoch or fetching images ??? -> propably yes

// data should be returned in json format
// should data formats be defined for vue app to use and abstract from ?

/*
    THE PLAN:

    Construct "interface" out of 2 components:
        1. interpreter for LUIS data
        2. response creator

    -> interface sould return response in json format

    THE QUESTION:
        How do i construct an interface that lets these components work together

*/

import {
  BaseInformationExtractor,
  IntentExtractor,
  PhraseListExtractor,
} from './information_extractors';

import {
  BaseResponseCreator,
  NoneResponseCreator,
  LunchResponseCreator,
} from './response_creators';

export class BotResponse<
  T extends BaseInformationExtractor,
  V extends BaseResponseCreator
> {
  private information_extractor: BaseInformationExtractor;
  private response_creator: BaseResponseCreator;

  public constructor(information_extractor: T, response_creator: V) {
    this.information_extractor = information_extractor;
    this.response_creator = response_creator;
  }

  // sets the nformationExtractor instance's input data
  public set_input_data(input_data: object) {
    this.information_extractor.set_input_data(input_data);
  }

  public analyze_data() {
    this.information_extractor.extract_data();
    this.response_creator.create_response(this.information_extractor);
  }

  public get_response_data() {
    return this.response_creator.get_response_data();
  }
}

export class BotResponseFactory {
  /**
   * @param {input_data} - json data object
   * @return {BotResponse}
   */
  public static make_response(input_data: object) {
    if (NoneResponseCreator.fits_input(input_data)) {
      return new BotResponse(new IntentExtractor(), new NoneResponseCreator());
    } else if (LunchResponseCreator.fits_input(input_data)) {
      return new BotResponse(
        new PhraseListExtractor(),
        new LunchResponseCreator()
      );
    } else {
      return null;
    }
  }
}
