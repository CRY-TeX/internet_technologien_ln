const { Bot } = require('../../bot/src/bot');

class BotUserConnector {
  #ws_connection = null;
  #bot = null;

  constructor(ws_connection) {
    this.#ws_connection = ws_connection;
    this.#bot = new Bot();

    this.#ws_connection.on('message', (message) => {
      try {
        // TODO: give response to user that someting went wrong
        const json_msg_data = JSON.parse(message.utf8Data);

        this.#bot.get_response(json_msg_data.msg, (response) => {
          this.#ws_connection.sendUTF(JSON.stringify(response));
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  get_connection() {
    return this.#ws_connection;
  }
}

module.exports = {
  BotUserConnector,
};
