// implement context into bot class
// we need some way to construct the right interface for given question / intent
// should responses be saved in array etc...

const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/production/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

module.exports = class Bot {
  #res_data;

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

      // get top intent
      const top_intent = luis_res.prediction.topIntent;
      let response_data = null;

      // match pattern of top intent with response data
      //  -> randomize response sentence
      for (let el of this.#res_data) {
        if (el.intent === top_intent) {
          if (el.entities) {
            response_data = el.answers[0].answers[0];
            break;
          } else {
            response_data = el.answers[0];
            break;
          }
        }
      }

      // pass response data to callback function
      callback(response_data);
    } catch (error) {
      console.error(error);
    }
  }
};
