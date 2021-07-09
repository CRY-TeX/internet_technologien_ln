import http from 'http';
import express from 'express';
import websocket from 'websocket';
import net from 'net';

import BotUserConnector from './bot_user_connector';

export default class App {
  readonly host_name: string;
  readonly port: number;

  private express_app: express.Express;
  private http_server: http.Server;
  private ws_server: websocket.server;
  private bot_user_map: BotUserConnector[];

  /**
   * @param host_name - host name or ip of server
   * @param port - port of server
   *
   * creates an http server that hosts an express app and a websocket server
   */
  public constructor(host_name: string, port: number) {
    this.host_name = host_name;
    this.port = port;
    this.express_app = express();
    this.http_server = http.createServer(this.express_app);
    this.ws_server = new websocket.server({
      httpServer: this.http_server,
      autoAcceptConnections: true, // TODO: change later to false
    });
    this.bot_user_map = [];
  }

  /**
   * start all server
   */
  public start(): void {
    this.set_websocket_events();
    this.http_server.listen(this.port, this.host_name, () => {
      console.log(`Server started: ${this.http_url}`);
    });
  }

  private get base_address(): string {
    try {
      const address_info: string | net.AddressInfo | null = this.http_server.address();
      if (typeof address_info === 'string' || address_info === null)
        throw new Error('could not get address info from http server');

      return `${address_info.address}:${address_info.port}`;
    } catch (error) {
      console.error(error);
      return '';
    }
  }

  /**
   * @return {string} - the http url of the server
   */
  public get http_url(): string {
    return `http://${this.base_address}`;
  }

  /**
   * @return {string} - the websocket url of the server
   */
  public get websocket_url(): string {
    return `ws://${this.base_address}`;
  }

  private set_websocket_events(): void {
    this.ws_server.on('connect', (connection: websocket.connection) => {
      // store connection
      this.bot_user_map.push(new BotUserConnector(connection));

      connection.on('close', () => {
        this.bot_user_map = this.bot_user_map.filter((el) => el.get_connection().connected);
      });
    });

    // TODO: handle disconnect
  }
}
