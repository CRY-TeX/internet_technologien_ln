const {
  IntentExtractor,
  PhraseListExtractor,
} = require('./information_extractors');

const { SimpleIntent, PhraseListData } = require('./adaptor_data_objs');

const { ResponseData } = require('./response_data');

class ResponseCreatorInterface {
  _intent = null;
  _response_data = null;

  constructor() {
    if (new.target === ResponseCreatorInterface)
      throw new TypeError(
        `Cannot construct ${ResponseCreatorInterface.name} directly`
      );

    if (this.is_compatible === undefined)
      throw new TypeError('method is_compatible must be implemented');

    if (this._create_response_implementation === undefined)
      throw new TypeError(
        'method #create_response_implementation must be implemented'
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

    this.#create_response_implementation(information_extractor);
  }

  get_response_data() {
    return this._response_data; // json_obj
  }
}

class NoneResponseCreator extends ResponseCreatorInterface {
  #answers = [
    'Entschuldigen Sie, ich habe sie nicht verstanden.',
    'Können sie das bitte nochmal wiederholen',
    'Ich konnte sie leider nicht verstehen.',
    'Wie bitte?',
  ];

  constructor() {
    super();
    super._intent = 'None';
  }

  is_compatible(information_extractor) {
    return information_extractor.constructor === IntentExtractor;
  }

  _create_response_implementation(information_extractor) {
    // TODO: change if luis also recognizes entities in None intent
    return this.#answers[Math.random() * this.#answers.length];
  }
}

class LunchResponseCreator extends ResponseCreatorInterface {
  #required_score = 0.8;
  #under_score_answers = [
    'Ich konnte sie leider nicht genau verstehen. Wollen sie ein Mittagessen kochen?',
  ];
  #answers = [
    'Was für eine Art von Mittagessen stellen Sie sich denn vor?',
    'Haben Sie eine bestimmte Vorstellung?',
  ];
  #suggestions = [];

  constructor() {
    super();
    super._intent = 'Mittagessen';
  }

  is_compatible(information_extractor) {
    return information_extractor.constructor === PhraseListExtractor;
  }

  _create_response_implementation(information_extractor) {
    const extracted_data = information_extractor.get_extracted_data();
    super._response_data = new ResponseData();

    if (extracted_data.score < this.#required_score) {
      super._response_data.set_response_part(
        false,
        this.#under_score_answers[
          Math.random() * this.#under_score_answers.length
        ]
      );
    } else {
      super._response_data.set_response_part(
        false,
        this.#answers[Math.random() * this.#answers.length]
      );
    }
  }
}
