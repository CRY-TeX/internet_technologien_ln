const express = require('express');
const http = require('http');
const ws = require('websocket');
const cors = require('cors');

// server creation
const app = express();
const server = http.createServer(app);
const wss = new ws.server({ httpServer: server, autoAcceptConnections: true });

// express implementation
const PORT = process.env.PORT || 3000;
const HOST_NAME = 'localhost';

// app.use(cors());

// start express and ws server
server.listen(PORT, HOST_NAME, () =>
  console.log(
    `Server started: http://${server.address().address}:${
      server.address().port
    }`
  )
);

// websocket implementation
const bot = require('../../bot/src/Bot');

class ConnectionMapper {
  constructor(user_connection) {
    this.user_connection = user_connection;
    this.chat_bot = new bot.Bot(
      `ws://${server.address().address}:${server.address().port}`
    );
  }
}

const mappers = [];

// TODOs: send data to bot

wss.on('connect', (connection) => {
  connection.on('message', (message) => {
    try {
      console.log(message.utf8Data);
      let json = JSON.parse(message.utf8Data);

      if (json.type === 'user') {
        // create new mapping
        // create new bot
        mappers.push(new ConnectionMapper(connection));
        // console.log(mappers);
      } else if (json.type === 'user_msg') {
        for (let m of mappers) {
          if (m.user_connection === connection) {
            m.chat_bot.connection.sendUTF(message.utf8Data);
          }
        }
      } else {
        let json = JSON.stringify(message.utf8Data);

        console.log(json);
      }
    } catch (error) {
      console.error(error);
    }
  });
});
