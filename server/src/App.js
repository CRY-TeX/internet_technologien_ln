const http = require('http');
const express = require('express');
const websocket = require('websocket');

const { BotUserConnector } = require('./bot_user_connector');

module.exports = class App {
  #express_app = null;
  #http_server = null;
  #ws_server = null;
  #bot_user_map = [];

  /**
   * @param host_name - host name or ip of server
   * @param port - port of server
   *
   * creates an http server that hosts an express app and a websocket server
   */
  constructor(host_name, port) {
    this.host_name = host_name;
    this.port = port;
    this.#express_app = express();
    this.#http_server = http.createServer(this.#express_app);
    this.#ws_server = new websocket.server({
      httpServer: this.#http_server,
      autoAcceptConnections: true, // TODO: change later to false
    });
    this.#bot_user_map = [];
  }

  /**
   * start all server
   */
  start() {
    this.#set_websocket_events();
    this.#http_server.listen(this.port, this.host_name, () => {
      console.log(`Server started: ${this.http_url()}`);
    });
  }

  get #base_address() {
    return `${this.#http_server.address().address}:${
      this.#http_server.address().port
    }`;
  }

  /**
   * @return {string} - the http url of the server
   */
  get http_url() {
    return `http://${this.#base_address}`;
  }

  /**
   * @return {string} - the websocket url of the server
   */
  get websocket_url() {
    return `ws://${this.#base_address}`;
  }

  #set_websocket_events() {
    this.#ws_server.on('connect', (connection) => {
      // store connection
      this.#bot_user_map.push(new BotUserConnector(connection));

      connection.on('close', () => {
        this.#bot_user_map = this.#bot_user_map.filter(
          (el) => el.get_connection().connected
        );
      });
    });

    // TODO: handle disconnect
  }
};
