const express = require('express');
const http = require('http');
const ws = require('ws');
const cors = require('cors');

// server creation
const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

// express implementation
const PORT = process.env.PORT || 3000;
const HOST_NAME = 'localhost';

app.use(cors());
app.use('/api', require('./api/routes'));

// websocket implementation
wss.on('connection', (socket) => {
  socket.on('message', (message) => console.log(message));
});

// start express and ws server
server.listen(PORT, HOST_NAME, () =>
  console.log(
    `Server started: http://${server.address().address}:${
      server.address().port
    }`
  )
);
