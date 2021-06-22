const { Bot } = require('../../bot/src/bot');

class BotUserConnector {
  #ws_connection = null;
  #bot = null;

  constructor(ws_connection) {
    this.#ws_connection = ws_connection;
    this.#bot = new Bot();

    this.#ws_connection.on('message', (message) => {
      this.#bot.get_response(message, (response) => {
        this.#ws_connection.sendUTF(JSON.stringify(response));
      });
    });
  }

  get_connection() {
    return this.#ws_connection;
  }
}

module.exports = {
  BotUserConnector,
};
