// implement context into bot class
// we need some way to construct the right interface for given question / intent
// should responses be saved in array etc...

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const { BotResponse, BotResponseFactory } = require('./response/bot_response');

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/production/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

class Bot {
  #res_data = null;

  constructor() {
    // TODO: implement context
    try {
      const file_content = fs.readFileSync(
        path.join(path.dirname(__filename), '../data/bot_response.json')
      );
      this.#res_data = JSON.parse(file_content);
    } catch (error) {
      console.error(error);
      this.#res_data = null;
      throw new Error('unable to read response file data');
    }
  }

  async #fetch_luis(msg) {
    try {
      const res = await fetch(`${LUIS_ENDPONT}${msg}`);
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async get_response(msg, callback) {
    // construct response
    try {
      // get luis response
      const luis_res = await this.#fetch_luis(msg);

      const bot_response = BotResponseFactory.make_response(luis_res);
      bot_response.set_input_data(luis_res);
      bot_response.analyze_data();

      // pass response data to callback function
      callback(bot_response.get_response_data());
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  Bot,
};
