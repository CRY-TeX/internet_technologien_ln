"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunchBotResponse = exports.NoneBotResponse = exports.BaseBotResponse = void 0;
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
exports.BaseBotResponse = BaseBotResponse;
var NoneBotResponse = /** @class */ (function (_super) {
    __extends(NoneBotResponse, _super);
    function NoneBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'None',
            },
        };
        return _this;
    }
    NoneBotResponse.prototype.analyze_data = function () {
        var last_context_item = this.context[this.context.length - 1];
        if (last_context_item instanceof LunchBotResponse) {
            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                    msg: 'Welche Art von Mittagessen wollen Sie zubereiten?',
                } });
        }
        else {
            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                    msg: 'Ich konnte sie nicht richtig verstehen. Können Sie das bitte wiederholen?',
                } });
        }
    };
    return NoneBotResponse;
}(BaseBotResponse));
exports.NoneBotResponse = NoneBotResponse;
var LunchBotResponse = /** @class */ (function (_super) {
    __extends(LunchBotResponse, _super);
    function LunchBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'want-food',
                entities: {
                    'menu-type': [
                        {
                            Mittagessen: '*',
                        },
                    ],
                },
            },
        };
        return _this;
    }
    LunchBotResponse.prototype.analyze_data = function () {
        this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                msg: 'Was für ein Mittagessen wollen Sie denn kochen?',
            } });
    };
    return LunchBotResponse;
}(BaseBotResponse));
exports.LunchBotResponse = LunchBotResponse;
//# sourceMappingURL=bot_response.js.map