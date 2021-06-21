class SimpleIntent {
  intent = null; // string
  score = null; // double

  constructor(intent, score) {
    this.intent = intent;
    this.score = score;
  }
}

class PhraseListData extends SimpleIntent {
  category = null; // string
  entity = null; // string

  constructor(intent, score, category, entity) {
    super(intent, score);
    this.category = category;
    this.entity = entity;
  }
}

module.exports = {
  SimpleIntent,
  PhraseListData,
};
