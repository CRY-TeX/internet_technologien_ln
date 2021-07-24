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
exports.query_recipes = exports.build_search_url = exports.Duration = exports.Difficulty = exports.random_recipe = exports.recipe_of_the_day = exports.MeatPref = void 0;
/**
 * WHICH SCRAPERS DO I NEED?
 *
 * - normal recipe searches
 * - random recipes
 * - suggestion of the day
 */
var node_fetch_1 = __importDefault(require("node-fetch"));
var jsdom_1 = __importDefault(require("jsdom"));
var MeatPref;
(function (MeatPref) {
    MeatPref["NO_PREF"] = "";
    MeatPref["VEGAN"] = "vegan";
    MeatPref["VEGETARIAN"] = "vegetarisch";
})(MeatPref = exports.MeatPref || (exports.MeatPref = {}));
function recipe_ok(obj) {
    for (var prop in obj) {
        if (obj[prop] === null || obj[prop] === undefined)
            return false;
    }
    return true;
}
function recipe_of_the_day(meat_pref) {
    return __awaiter(this, void 0, void 0, function () {
        var base_url, url, res, dom, _a, _b, doc, recipe, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    base_url = 'https://www.chefkoch.de';
                    url = base_url + "/rezept-des-tages/" + meat_pref;
                    return [4 /*yield*/, node_fetch_1.default(url)];
                case 1:
                    res = _c.sent();
                    _b = (_a = jsdom_1.default.JSDOM).bind;
                    return [4 /*yield*/, res.text()];
                case 2: return [4 /*yield*/, new (_b.apply(_a, [void 0, _c.sent()]))()];
                case 3:
                    dom = _c.sent();
                    doc = dom.window.document;
                    recipe = {
                        name: doc.querySelector('#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > a > h3').textContent,
                        link: doc.querySelector('#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > a').href,
                        preview_url: doc.querySelector('#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__picture > a > img').src,
                        cooking_time: doc.querySelector('#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > aside > span.meta--clock').textContent.trim(),
                        difficulty: doc.querySelector('#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > aside > span.meta--badge').textContent.trim(),
                    };
                    if (!recipe_ok(recipe))
                        throw new Error('Could not scrape all data');
                    recipe.link = "" + base_url + recipe.link;
                    return [2 /*return*/, recipe];
                case 4:
                    error_1 = _c.sent();
                    console.log(error_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.recipe_of_the_day = recipe_of_the_day;
function random_recipe() {
    return __awaiter(this, void 0, void 0, function () {
        var url, res, doc, _a, _b, recipe, error_2;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 4, , 5]);
                    url = 'https://www.chefkoch.de/rezepte/was-koche-ich-heute/';
                    return [4 /*yield*/, node_fetch_1.default(url)];
                case 1:
                    res = _c.sent();
                    _b = (_a = jsdom_1.default.JSDOM).bind;
                    return [4 /*yield*/, res.text()];
                case 2: return [4 /*yield*/, new (_b.apply(_a, [void 0, _c.sent()]))()];
                case 3:
                    doc = (_c.sent()).window.document;
                    recipe = {
                        name: doc.querySelector('#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > span').textContent,
                        link: doc.querySelector('#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a').href,
                        preview_url: doc.querySelector('#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > img').src,
                        cooking_time: doc.querySelector('#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > div > span').textContent.trim(),
                        difficulty: '', // TODO: fix difficulty
                    };
                    if (!recipe_ok(recipe))
                        throw new Error('Could not scrape all data of recipe');
                    return [2 /*return*/, recipe];
                case 4:
                    error_2 = _c.sent();
                    console.error(error_2);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.random_recipe = random_recipe;
var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "d1";
    Difficulty["AND_MEDIUM"] = "d1,2";
    Difficulty["AND_HARD"] = "d1,2,3";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
var Duration;
(function (Duration) {
    Duration["ALL"] = "";
    Duration["D15"] = "m15";
    Duration["D30"] = "m30";
    Duration["D60"] = "m60";
    Duration["D120"] = "m120";
})(Duration = exports.Duration || (exports.Duration = {}));
function build_search_url(search_name, category, duration, difficulty) {
    if (category === void 0) { category = { id: 's0', html_file: 'Rezepte.html' }; }
    if (duration === void 0) { duration = Duration.ALL; }
    if (difficulty === void 0) { difficulty = Difficulty.AND_HARD; }
    return "https://www.chefkoch.de/rs/" + category.id + "e1n1z1b0i1" + duration + difficulty + "/" + search_name
        .trim()
        .replace(' ', '+') + "/" + category.html_file;
}
exports.build_search_url = build_search_url;
function get_recipe_data(el) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        return {
            name: el.querySelector('h2.ds-heading-link').textContent,
            link: el.href,
            preview_url: (_a = el.querySelector('figure amp-img')) === null || _a === void 0 ? void 0 : _a.getAttribute('src'),
            cooking_time: (_e = (_d = (_c = (_b = el === null || el === void 0 ? void 0 : el.querySelector('span.recipe-preptime')) === null || _b === void 0 ? void 0 : _b.childNodes) === null || _c === void 0 ? void 0 : _c[1]) === null || _d === void 0 ? void 0 : _d.nodeValue) === null || _e === void 0 ? void 0 : _e.trim(),
            difficulty: (_j = (_h = (_g = (_f = el === null || el === void 0 ? void 0 : el.querySelector('span.recipe-difficulty')) === null || _f === void 0 ? void 0 : _f.childNodes) === null || _g === void 0 ? void 0 : _g[1]) === null || _h === void 0 ? void 0 : _h.nodeValue) === null || _j === void 0 ? void 0 : _j.trim(),
        };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function query_recipes(url) {
    return __awaiter(this, void 0, void 0, function () {
        var doc, _a, _b, meals, _i, _c, el, recipe, error_3;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _d.trys.push([0, 4, , 5]);
                    _b = (_a = jsdom_1.default.JSDOM).bind;
                    return [4 /*yield*/, node_fetch_1.default(url)];
                case 1: return [4 /*yield*/, (_d.sent()).text()];
                case 2: return [4 /*yield*/, new (_b.apply(_a, [void 0, _d.sent()]))()];
                case 3:
                    doc = (_d.sent()).window.document;
                    meals = [];
                    for (_i = 0, _c = doc.querySelectorAll('a.rsel-recipe.bi-recipe-item'); _i < _c.length; _i++) {
                        el = _c[_i];
                        recipe = get_recipe_data(el);
                        // TODO: print out waring or smth
                        if (recipe === null) {
                            console.warn('recipe is null');
                            continue;
                        }
                        if (!recipe_ok(recipe)) {
                            console.warn('recipe has null value');
                            continue;
                        }
                        meals.push(recipe);
                    }
                    return [2 /*return*/, meals];
                case 4:
                    error_3 = _d.sent();
                    console.error(error_3);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.query_recipes = query_recipes;
//# sourceMappingURL=chefkoch_scrape.js.map