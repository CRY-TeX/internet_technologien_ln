const { SimpleIntent, PhraseListData } = require('./adaptor_data_objs');

class InformationExtractorInterface {
  _input_data = null; // json_obj
  _extracted_data = null; // data_obj

  constructor() {
    if (new.target === InformationExtractorInterface)
      throw new TypeError(
        `Cannot construct ${InformationExtractorInterface.name} directly`
      );

    if (this._input_data.extract_data === undefined)
      throw new TypeError('method get_extracted_data must be implemented');
  }

  // data: json_obj
  set_input_data(input_data) {
    this._input_data = input_data;
  }

  get_input_data() {
    return this._input_data;
  }

  get_extracted_data() {
    return this._extracted_data;
  }

  _get_top_intent() {
    return this._input_data.prediction.topIntent;
  }

  _get_top_intent_score() {
    return this._input_data.prediction.intents[
      this._input_data.prediction.topIntent
    ].score;
  }

  // virtual method extract_data() : json_obj
}

class IntentExtractor extends InformationExtractorInterface {
  constructor() {
    super();
  }

  extract_data() {
    try {
      if (super._input_data.prediction.topIntent === undefined)
        throw new TypeError('topIntent is undefined');

      super._extracted_data = new SimpleIntent(
        super._get_top_intent(),
        super._get_top_intent_score()
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

class PhraseListExtractor extends InformationExtractorInterface {
  constructor() {
    super();
  }

  extract_data() {
    try {
      if (super._input_data.prediction.topIntent === undefined)
        throw new TypeError('topIntent is undefined');

      const category = Object.keys(this._input_data.entities)[0];
      const entity = Object.keys(this._input_data.entities[category])[0];
      super._extracted_data = new PhraseListData(
        super._get_top_intent(),
        super._get_top_intent_score(),
        category,
        entity
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = {
  IntentExtractor,
  PhraseListExtractor,
};
