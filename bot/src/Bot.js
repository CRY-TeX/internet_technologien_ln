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

  async #fetch_data(data) {
    try {
      const res = await fetch(`${LUIS_ENDPONT}${data.msg}`);
      return await res.json();
    } catch (error) {
      console.error(error);
    }
  }

  async get_response(callback) {
    // construct response
    try {
      callback(this.#res_data);
    } catch (error) {
      console.error(error);
    }
  }
};
