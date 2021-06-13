const config = require('../config/config.json');

const proxy_path = `http://${config.server.host_name}:${config.server.port}/`;

module.exports = {
  // options...
  devServer: {
    proxy: proxy_path,
  },
};
