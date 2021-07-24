"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = __importDefault(require("../bot/bot"));
var BotUserConnector = /** @class */ (function () {
    function BotUserConnector(ws_connection) {
        var _this = this;
        this.ws_connection = ws_connection;
        this.bot = new bot_1.default();
        try {
            this.ws_connection.sendUTF(JSON.stringify(this.bot.get_inital()));
        }
        catch (error) {
            console.error(error);
        }
        this.ws_connection.on('message', function (message) {
            try {
                // TODO: give response to user that someting went wrong
                var json_msg_data = JSON.parse(message.utf8Data);
                _this.bot.get_response(json_msg_data.msg, function (response) {
                    _this.ws_connection.sendUTF(JSON.stringify(response));
                });
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    BotUserConnector.prototype.get_connection = function () {
        return this.ws_connection;
    };
    return BotUserConnector;
}());
exports.default = BotUserConnector;
//# sourceMappingURL=bot_user_connector.js.map