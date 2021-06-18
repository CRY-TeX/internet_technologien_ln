const websocket = require('websocket');
const fetch = require('node-fetch');

const LUIS_ENDPONT =
  'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/production/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';

class Bot {
  constructor(address) {
    this.address = address;
    this.client = new websocket.client();
    this.client.connect(this.address, 'echo-protocol');

    // TODO: implement context

    this.connection = null;
    this.client.on('connect', (connection) => {
      this.connection = connection;
      connection.sendUTF(
        JSON.stringify({
          type: 'bot',
          msg: 'success',
        })
      );

      this.connection.on('message', (message) => {
        try {
          let json = JSON.parse(message.utf8Data);

          if (json.type === 'user_msg') {
            this.#fetch_data(json);
          }
        } catch (error) {
          console.error(error);
        }
      });
    });
  }

  is_connected() {
    return this.connection !== null;
  }

  async #fetch_data(data) {
    try {
      const res = await fetch(`${LUIS_ENDPONT}${data.msg}`);
      const json = res.json();

      this.connection.sendUTF(JSON.stringify(json));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = {
  Bot,
};
