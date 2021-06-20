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

// TODO: define interface for input data

class InformationExtractorInterface {
  #input_data = null;

  constructor() {
    if (new.target === InformationExtractorInterface)
      throw new TypeError(
        `Cannot construct ${InformationExtractorInterface.name} directly`
      );

    if (this.get_extracted_data === undefined)
      throw new TypeError('method get_extracted_data must be implemented');
  }

  // data: json_obj
  set_input_data(input_data) {
    this.#input_data = input_data;
  }

  get_input_data() {
    return this.#input_data;
  }

  // virtual method get_extracted_data() : json_obj
}

class ResponseCreatorInterface {
  #analyzed_data = null;

  constructor() {
    if (new.target === ResponseCreatorInterface)
      throw new TypeError(
        `Cannot construct ${ResponseCreatorInterface.name} directly`
      );

    if (this.is_compatible === undefined)
      throw new TypeError('method is_compatible must be implemented');

    if (this.create_response_implementation === undefined)
      throw new TypeError(
        'method create_response_implementation must be implemented'
      );
  }

  // is_compatible(InformationExtractorInterface) : bool

  // create_response_implementation(InformationExtractorInterface) : void

  // method create_response(InformationExtractorInterface) : void
  create_response(information_extractor) {
    if (information_extractor === null || information_extractor === undefined)
      throw new TypeError('InformationExtractor is null or undefined');

    if (!this.is_compatible(information_extractor))
      throw new TypeError(
        `${InformationExtractorInterface.name} "${information_extractor.constructor.name}" is not compatible with ${ResponseCreatorInterface.name}"`
      );

    this.create_response_implementation(information_extractor);
  }

  get_response_data() {
    return this.#analyzed_data; // json_obj
  }
}

// Interface BotResponse
class BotResponseInterface {
  #information_extractor = null;
  #data_analyzer = null;

  constructor() {
    if (new.target === IBotResponse)
      throw new TypeError(`Cannot construct ${IBotResponse.name} directly`);

    if (this.#information_extractor === null)
      throw new TypeError(
        `variable ${this.#information_extractor.name} needs to be instantiated`
      );

    if (this.#data_analyzer === null)
      throw new TypeError(
        `variable ${this.#data_analyzer.name} needs to be instantiated`
      );
  }

  // sets the nformationExtractor instance's input data
  set_input_data(input_data) {
    this.#information_extractor.set_input_data(input_data);
  }

  // virtual method get_response_data() : json_obj
  get_response_data() {
    this.analyze_data(this.#information_extractor);
    return this.get_analyzed_data();
  }
}

class BotResponseFactory {
  /**
   * @param {input_data} - json data object
   * @return {BotResponseInterface}
   */
  make_response(input_data) {
    return null;
  }
}
