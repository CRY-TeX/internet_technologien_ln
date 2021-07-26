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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var bot_response_factory_1 = require("./bot_response_factory");
var base_bot_response_1 = __importDefault(require("./base_bot_response"));
var util_1 = require("../util/util");
var Bot = /** @class */ (function () {
    function Bot() {
        this.bot_response_factory = new bot_response_factory_1.BotResponseFactory();
    }
    Bot.prototype.get_inital = function () {
        var _a, _b, _c, _d, _e;
        return {
            id: 0,
            query: '',
            answer_message: {
                msg: (_d = (_c = (_b = (_a = base_bot_response_1.default.get_data()) === null || _a === void 0 ? void 0 : _a.intents) === null || _b === void 0 ? void 0 : _b.help) === null || _c === void 0 ? void 0 : _c.answers) === null || _d === void 0 ? void 0 : _d[0],
            },
            suggestions: util_1.rand_slice((_e = base_bot_response_1.default.get_data()) === null || _e === void 0 ? void 0 : _e.suggestions),
        };
    };
    // TODO: fix any later
    Bot.prototype.fetch_luis = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var res, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, node_fetch_1.default("" + Bot.LUIS_ENDPONT + msg)];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, res.json()];
                    case 2: return [2 /*return*/, (_a.sent())];
                    case 3:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.get_response = function (msg, callback) {
        return __awaiter(this, void 0, void 0, function () {
            var luis_data, bot_response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.fetch_luis(msg)];
                    case 1:
                        luis_data = _a.sent();
                        if (luis_data === null)
                            throw new Error('Could not fetch luis response');
                        return [4 /*yield*/, this.bot_response_factory.make_bot_response(luis_data)];
                    case 2:
                        bot_response = _a.sent();
                        if (bot_response === null)
                            throw new Error('Could not create bot response');
                        // pass response data to callback function
                        callback(bot_response.get_response_data());
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Bot.LUIS_ENDPONT = 'https://westeurope.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/ecd8f1f0-f233-4a40-a035-ba44df647dfe/slots/staging/predict?subscription-key=1659ae301f684ea5b77dc144327fe0d2&verbose=true&show-all-intents=true&log=true&query=';
    return Bot;
}());
exports.default = Bot;
//# sourceMappingURL=bot.js.map