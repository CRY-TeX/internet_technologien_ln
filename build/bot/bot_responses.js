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
exports.LunchBotResponse = exports.RegionalBotResponse = exports.RandomFoodBotResponse = exports.FoodOfTheDayBotResponse = exports.HelpBotResponse = exports.NoneBotResponse = void 0;
var base_bot_response_1 = __importDefault(require("./base_bot_response"));
var chefkoch_scrape_1 = require("../util/chefkoch_scrape");
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
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                this.response_data = __assign(__assign({}, this.response_boilerplate()), { query: '', answer_message: {
                        msg: (_d = (_c = (_b = (_a = base_bot_response_1.default.get_data()) === null || _a === void 0 ? void 0 : _a.intents) === null || _b === void 0 ? void 0 : _b.help) === null || _c === void 0 ? void 0 : _c.answers) === null || _d === void 0 ? void 0 : _d[0],
                    } });
                return [2 /*return*/];
            });
        });
    };
    return NoneBotResponse;
}(base_bot_response_1.default));
exports.NoneBotResponse = NoneBotResponse;
var HelpBotResponse = /** @class */ (function (_super) {
    __extends(HelpBotResponse, _super);
    function HelpBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'help',
            },
        };
        return _this;
    }
    HelpBotResponse.prototype.analyze_data = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                        msg: (_d = (_c = (_b = (_a = base_bot_response_1.default.get_data()) === null || _a === void 0 ? void 0 : _a.intents) === null || _b === void 0 ? void 0 : _b.help) === null || _c === void 0 ? void 0 : _c.answers) === null || _d === void 0 ? void 0 : _d[0],
                    } });
                return [2 /*return*/];
            });
        });
    };
    return HelpBotResponse;
}(base_bot_response_1.default));
exports.HelpBotResponse = HelpBotResponse;
var FoodOfTheDayBotResponse = /** @class */ (function (_super) {
    __extends(FoodOfTheDayBotResponse, _super);
    function FoodOfTheDayBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'food-of-the-day',
            },
        };
        return _this;
    }
    FoodOfTheDayBotResponse.prototype.analyze_data = function () {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var entities, meat_pref, keys, _d, _e;
            var _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        entities = (_b = (_a = this.luis_data) === null || _a === void 0 ? void 0 : _a.prediction) === null || _b === void 0 ? void 0 : _b.entities;
                        meat_pref = chefkoch_scrape_1.MeatPref.NO_PREF;
                        if (Object.keys(entities).length > 0) {
                            keys = Object.keys((_c = entities === null || entities === void 0 ? void 0 : entities['meat-preference']) === null || _c === void 0 ? void 0 : _c[0]);
                            if (keys === undefined)
                                meat_pref = chefkoch_scrape_1.MeatPref.NO_PREF;
                            else if (keys.includes('vegan'))
                                meat_pref = chefkoch_scrape_1.MeatPref.VEGAN;
                            else if (keys.includes('vegetarian'))
                                meat_pref = chefkoch_scrape_1.MeatPref.VEGETARIAN;
                        }
                        _d = this;
                        _e = [__assign({}, this.response_boilerplate())];
                        _f = {};
                        _g = {
                            msg: "Hier ist das Essen des Tages. " + (meat_pref !== chefkoch_scrape_1.MeatPref.NO_PREF ? "(" + meat_pref + ")" : '')
                        };
                        return [4 /*yield*/, chefkoch_scrape_1.recipe_of_the_day(meat_pref)];
                    case 1:
                        _d.response_data = __assign.apply(void 0, _e.concat([(_f.answer_message = (_g.meal_item = (_h.sent()),
                                _g), _f)]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return FoodOfTheDayBotResponse;
}(base_bot_response_1.default));
exports.FoodOfTheDayBotResponse = FoodOfTheDayBotResponse;
var RandomFoodBotResponse = /** @class */ (function (_super) {
    __extends(RandomFoodBotResponse, _super);
    function RandomFoodBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'random-food',
            },
        };
        return _this;
    }
    RandomFoodBotResponse.prototype.analyze_data = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        _b = [__assign({}, this.response_boilerplate())];
                        _c = {};
                        _d = {
                            msg: 'Hier ist ein zufälliges Essen'
                        };
                        return [4 /*yield*/, chefkoch_scrape_1.random_recipe()];
                    case 1:
                        _a.response_data = __assign.apply(void 0, _b.concat([(_c.answer_message = (_d.meal_item = (_e.sent()),
                                _d), _c)]));
                        return [2 /*return*/];
                }
            });
        });
    };
    return RandomFoodBotResponse;
}(base_bot_response_1.default));
exports.RandomFoodBotResponse = RandomFoodBotResponse;
var RegionalBotResponse = /** @class */ (function (_super) {
    __extends(RegionalBotResponse, _super);
    function RegionalBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'want-food',
                entities: {
                    region: '*',
                },
            },
        };
        return _this;
    }
    RegionalBotResponse.prototype.analyze_data = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var region_name, category, keys, search_url, meal_items;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        region_name = (_d = (_c = (_b = (_a = this.luis_data) === null || _a === void 0 ? void 0 : _a.prediction) === null || _b === void 0 ? void 0 : _b.entities) === null || _c === void 0 ? void 0 : _c['region']) === null || _d === void 0 ? void 0 : _d[0];
                        if (!(region_name === undefined)) return [3 /*break*/, 1];
                        this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                msg: 'Von welcher Region möchten Sie ein Gericht zubereiten?',
                            } });
                        return [3 /*break*/, 3];
                    case 1:
                        category = null;
                        keys = Object.keys(region_name);
                        if (keys.includes('Afrika'))
                            category = { id: 's0g101', html_file: 'Afrikanische-Rezepte.html' };
                        if (keys.includes('Asien'))
                            category = { id: 's0g94', html_file: 'Asiatische-Rezepte.html' };
                        if (keys.includes('Amerika'))
                            category = { id: 's0g98', html_file: 'Amerikanische-Rezepte.html' };
                        search_url = category === null ? chefkoch_scrape_1.build_search_url('') : chefkoch_scrape_1.build_search_url('', category);
                        return [4 /*yield*/, chefkoch_scrape_1.query_recipes(search_url)];
                    case 2:
                        meal_items = _e.sent();
                        if (meal_items !== null && (meal_items === null || meal_items === void 0 ? void 0 : meal_items.length) > 0) {
                            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                    msg: 'Folgendes Regionales Essen kann ich Ihnen vorschlagen.',
                                    meal_item: meal_items[0],
                                }, meal_list: meal_items });
                        }
                        else {
                            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                    msg: 'Ich konnte Ihnen leider keine passenden Rezepte finden.',
                                } });
                        }
                        _e.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RegionalBotResponse;
}(base_bot_response_1.default));
exports.RegionalBotResponse = RegionalBotResponse;
var LunchBotResponse = /** @class */ (function (_super) {
    __extends(LunchBotResponse, _super);
    function LunchBotResponse(luis_data, context) {
        var _this = _super.call(this, luis_data, context) || this;
        _this.SCHEMA = {
            prediction: {
                topIntent: 'want-food',
                entities: {
                    'menu-type': '*',
                },
            },
        };
        return _this;
    }
    LunchBotResponse.prototype.analyze_data = function () {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var menu_type, category, keys, search_url, meal_items;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        menu_type = (_d = (_c = (_b = (_a = this.luis_data) === null || _a === void 0 ? void 0 : _a.prediction) === null || _b === void 0 ? void 0 : _b.entities) === null || _c === void 0 ? void 0 : _c['menu-type']) === null || _d === void 0 ? void 0 : _d[0];
                        if (!(menu_type === undefined)) return [3 /*break*/, 1];
                        this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                msg: 'Was für eine Art von Essen möchten Sie denn haben?',
                            } });
                        return [3 /*break*/, 3];
                    case 1:
                        category = null;
                        keys = Object.keys(menu_type);
                        // handle menu-type
                        if (keys.includes('Frühstück'))
                            category = { id: 's0g31', html_file: 'Fruehstuecksrezepte.html' };
                        else if (keys.includes('Vorspeise'))
                            category = { id: 's0g2', html_file: 'Vorspeisen-Rezepte.html' };
                        else if (keys.includes('Mittagessen'))
                            category = { id: 's0g9', html_file: 'Hauptspeisen-Rezepte.html' };
                        else if (keys.includes('Dessert'))
                            category = { id: 's0g19', html_file: 'Dessert-Rezepte.html' };
                        else if (keys.includes('Beilage'))
                            category = { id: 's0g26', html_file: 'Beilagen-Rezepte.html' };
                        search_url = category === null ? chefkoch_scrape_1.build_search_url('') : chefkoch_scrape_1.build_search_url('', category);
                        return [4 /*yield*/, chefkoch_scrape_1.query_recipes(search_url)];
                    case 2:
                        meal_items = _e.sent();
                        if (meal_items !== null && (meal_items === null || meal_items === void 0 ? void 0 : meal_items.length) > 0) {
                            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                    msg: 'Ich habe folgenden Vorschlag für Sie finden können',
                                    meal_item: meal_items[0],
                                }, meal_list: meal_items });
                        }
                        else {
                            this.response_data = __assign(__assign({}, this.response_boilerplate()), { answer_message: {
                                    msg: 'Ich konnte Ihnen leider keine passenden Rezepte finden.',
                                } });
                        }
                        _e.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return LunchBotResponse;
}(base_bot_response_1.default));
exports.LunchBotResponse = LunchBotResponse;
//# sourceMappingURL=bot_responses.js.map