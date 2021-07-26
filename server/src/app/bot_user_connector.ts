import websocket from 'websocket';

import Bot from '../bot/bot';
import { IApiResponse } from '../types/api_response_data.interface';

/**
 * This class is responsible for handling the between user and the the bot.
 * Every user connection is mapped to a bot.
 */
export default class BotUserConnector {
  private ws_connection: websocket.connection;
  private bot: Bot;

  public constructor(ws_connection: websocket.connection) {
    this.ws_connection = ws_connection;
    this.bot = new Bot();

    try {
      this.ws_connection.sendUTF(JSON.stringify(this.bot.get_inital()));
    } catch (error) {
      console.error(error);
    }

    this.ws_connection.on('message', (message: websocket.IMessage) => {
      try {
        const json_msg_data = JSON.parse(message.utf8Data as string);

        this.bot.get_response(json_msg_data.msg, (response: IApiResponse | null) => {
          this.ws_connection.sendUTF(JSON.stringify(response));
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public get_connection(): websocket.connection {
    return this.ws_connection;
  }
}
