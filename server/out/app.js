"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var websocket_1 = __importDefault(require("websocket"));
var bot_user_connector_1 = __importDefault(require("./bot_user_connector"));
var App = /** @class */ (function () {
    /**
     * @param host_name - host name or ip of server
     * @param port - port of server
     *
     * creates an http server that hosts an express app and a websocket server
     */
    function App(host_name, port) {
        this.host_name = host_name;
        this.port = port;
        this.express_app = express_1.default();
        this.http_server = http_1.default.createServer(this.express_app);
        this.ws_server = new websocket_1.default.server({
            httpServer: this.http_server,
            autoAcceptConnections: true, // TODO: change later to false
        });
        this.bot_user_map = [];
    }
    /**
     * start all server
     */
    App.prototype.start = function () {
        var _this = this;
        this.set_websocket_events();
        this.http_server.listen(this.port, this.host_name, function () {
            console.log("Server started: " + _this.http_url);
        });
    };
    Object.defineProperty(App.prototype, "base_address", {
        get: function () {
            var address_info = this.http_server.address();
            return address_info.address + ":" + address_info.port;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(App.prototype, "http_url", {
        /**
         * @return {string} - the http url of the server
         */
        get: function () {
            return "http://" + this.base_address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(App.prototype, "websocket_url", {
        /**
         * @return {string} - the websocket url of the server
         */
        get: function () {
            return "ws://" + this.base_address;
        },
        enumerable: false,
        configurable: true
    });
    App.prototype.set_websocket_events = function () {
        var _this = this;
        this.ws_server.on('connect', function (connection) {
            // store connection
            _this.bot_user_map.push(new bot_user_connector_1.default(connection));
            connection.on('close', function () {
                _this.bot_user_map = _this.bot_user_map.filter(function (el) { return el.get_connection().connected; });
            });
        });
        // TODO: handle disconnect
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=app.js.map