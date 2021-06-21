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

// Interface BotResponse
class BotResponseInterface {
  #information_extractor = null;
  #response_creator = null;

  constructor() {
    if (new.target === IBotResponse)
      throw new TypeError(`Cannot construct ${IBotResponse.name} directly`);

    if (this.#information_extractor === null)
      throw new TypeError(
        `variable ${this.#information_extractor.name} needs to be instantiated`
      );

    if (this.#response_creator === null)
      throw new TypeError(
        `variable ${this.#response_creator.name} needs to be instantiated`
      );
  }

  // sets the nformationExtractor instance's input data
  set_input_data(input_data) {
    this.#information_extractor.set_input_data(input_data);
  }

  analyze_data() {
    this.#information_extractor.extract_data();
    this.#response_creator.create_response(this.#information_extractor);
  }

  // TODO: virtual method get_response_data() : json_obj
  get_response_data() {
    return this.#response_creator.get_response_data();
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
