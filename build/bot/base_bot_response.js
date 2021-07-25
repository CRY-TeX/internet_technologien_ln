"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util/util");
var fs_1 = __importDefault(require("fs"));
var BaseBotResponse = /** @class */ (function () {
    function BaseBotResponse(luis_data, context) {
        this.luis_data = luis_data;
        this.context = context;
        this.response_data = null;
    }
    BaseBotResponse.prototype.get_response_data = function () {
        return this.response_data;
    };
    BaseBotResponse.prototype.fits_input = function (luis_data) {
        return util_1.matches_schema(this.SCHEMA, luis_data);
    };
    BaseBotResponse.prototype.response_boilerplate = function () {
        var _a, _b;
        BaseBotResponse.ID++;
        return {
            id: BaseBotResponse.ID,
            query: this.luis_data.query === undefined
                ? 'Upps, etwas ist schiefgelaufen... Keine Nachricht gefunden'
                : this.luis_data.query,
            suggestions: util_1.rand_slice((_b = (_a = BaseBotResponse.get_data()) === null || _a === void 0 ? void 0 : _a.inital_msg) === null || _b === void 0 ? void 0 : _b.suggestions),
        };
    };
    BaseBotResponse.get_data = function () {
        return BaseBotResponse.data;
    };
    BaseBotResponse.ID = 0;
    BaseBotResponse._read_data = (function () {
        try {
            var content = fs_1.default.readFileSync(__dirname + '/../data/bot_response.json', 'utf8');
            BaseBotResponse.data = JSON.parse(content);
        }
        catch (error) {
            console.error(error);
            BaseBotResponse.data = {};
        }
    })();
    return BaseBotResponse;
}());
exports.default = BaseBotResponse;
//# sourceMappingURL=base_bot_response.js.map
