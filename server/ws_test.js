const WebSocket = require('ws');

const my_ws = new WebSocket('ws://localhost:3000');

my_ws.on('open', () => {
  my_ws.send('hello');
  my_ws.close();
});
