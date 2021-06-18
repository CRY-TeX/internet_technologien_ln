const ws = require('websocket');

const client = new ws.client();

client.connect('ws://localhost:3000', 'echo-protocol');

client.on('connect', (connection) => {
  if (connection.connected) {
    connection.sendUTF(
      JSON.stringify({
        type: 'user',
        msg: 'hallo',
      })
    );

    setTimeout(() => {
      connection.sendUTF(
        JSON.stringify({
          type: 'user_msg',
          msg: 'ich möchte gerne ein mittagessen machen',
        })
      );
    }, 3000);
  }
});
