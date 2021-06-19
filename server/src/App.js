const http = require('http');
const express = require('express');
const websocket = require('websocket');
const Bot = require('../../bot/src/Bot');

module.exports = class App {
  #express_app;
  #http_server;
  #ws_server;
  #bot;

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
    this.#bot = new Bot();
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

  #base_address() {
    return `${this.#http_server.address().address}:${
      this.#http_server.address().port
    }`;
  }

  /**
   * @return {string} - the http url of the server
   */
  http_url() {
    return `http://${this.#base_address()}`;
  }

  /**
   * @return {string} - the websocket url of the server
   */
  websocket_url() {
    return `ws://${this.#base_address()}`;
  }

  #set_websocket_events() {
    this.#ws_server.on('connect', (connection) => {
      // store connection

      connection.on('message', (message) => {
        // analyze message
        this.#bot.get_response((response) => {
          connection.sendUTF(response);
        });
      });
    });
  }
};
