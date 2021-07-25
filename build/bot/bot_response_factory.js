"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotResponseFactory = void 0;
var bot_responses_1 = require("./bot_responses");
var BotResponseFactory = /** @class */ (function () {
    function BotResponseFactory() {
        this.context = [];
        this.response_class_names = [
            bot_responses_1.RandomFoodBotResponse,
            bot_responses_1.FoodOfTheDayBotResponse,
            bot_responses_1.RegionalBotResponse,
            bot_responses_1.LunchBotResponse,
            bot_responses_1.NoneBotResponse,
        ];
    }
    BotResponseFactory.prototype.make_bot_response = function (luis_data) {
        return __awaiter(this, void 0, void 0, function () {
            var bot_response, _i, _a, class_type;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bot_response = null;
                        // figure out the right bot response class
                        for (_i = 0, _a = this.response_class_names; _i < _a.length; _i++) {
                            class_type = _a[_i];
                            try {
                                // check if any reponse class fits the luis input data
                                bot_response = new class_type(luis_data, this.context);
                                if (bot_response.fits_input(luis_data))
                                    break;
                                else
                                    bot_response = null;
                            }
                            catch (error) {
                                console.error(error);
                            }
                        }
                        // no reponse was found
                        if (bot_response === null)
                            bot_response = new bot_responses_1.NoneBotResponse(luis_data, this.context);
                        // analyze data
                        return [4 /*yield*/, bot_response.analyze_data()];
                    case 1:
                        // analyze data
                        _b.sent();
                        // add to context
                        this.context.push(bot_response);
                        return [2 /*return*/, bot_response];
                }
            });
        });
    };
    return BotResponseFactory;
}());
exports.BotResponseFactory = BotResponseFactory;
//# sourceMappingURL=bot_response_factory.js.map