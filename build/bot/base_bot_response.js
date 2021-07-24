"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util/util");
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
        BaseBotResponse.ID++;
        return {
            id: BaseBotResponse.ID,
            query: this.luis_data.query === undefined
                ? 'Upps, etwas ist schiefgelaufen... Keine Nachricht gefunden'
                : this.luis_data.query,
        };
    };
    BaseBotResponse.ID = 0;
    return BaseBotResponse;
}());
exports.default = BaseBotResponse;
//# sourceMappingURL=base_bot_response.js.map