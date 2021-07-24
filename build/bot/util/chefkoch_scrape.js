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
var jsdom_1 = __importDefault(require("jsdom"));
function get_recipe_data(el) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    try {
        return {
            name: (_b = (_a = el === null || el === void 0 ? void 0 : el.querySelector('h2.ds-heading-link')) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.textContent,
            page_link: el === null || el === void 0 ? void 0 : el.link,
            preview_image: (_c = el === null || el === void 0 ? void 0 : el.querySelector('figure amp-img')) === null || _c === void 0 ? void 0 : _c.getAttribute('src'),
            cooking_time: (_g = (_f = (_e = (_d = el === null || el === void 0 ? void 0 : el.querySelector('span.recipe-preptime')) === null || _d === void 0 ? void 0 : _d.childNodes) === null || _e === void 0 ? void 0 : _e[1]) === null || _f === void 0 ? void 0 : _f.nodeValue) === null || _g === void 0 ? void 0 : _g.trim(),
            difficulty: (_l = (_k = (_j = (_h = el === null || el === void 0 ? void 0 : el.querySelector('span.recipe-difficulty')) === null || _h === void 0 ? void 0 : _h.childNodes) === null || _j === void 0 ? void 0 : _j[1]) === null || _k === void 0 ? void 0 : _k.nodeValue) === null || _l === void 0 ? void 0 : _l.trim(),
        };
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
function search_url_recipe(search_string, difficulty, duration_min, categories // array of category names strings
) {
    if (difficulty === void 0) { difficulty = 3; }
    if (duration_min === void 0) { duration_min = undefined; }
    if (categories === void 0) { categories = []; }
    // difficulty => 1,2,3
    var diff = Array(difficulty)
        .fill(0)
        .map(function (item, index) { return index + 1; })
        .join(',');
    return "https://www.chefkoch.de/rs/s0e1n1z1b0i1" + (duration_min ? 'd' + duration_min : '') + "d" + diff + "/" + search_string.toLowerCase().split(' ').join('+') + "/" + (categories.length > 0 ? categories.join('-') + '-' : '') + "Rezepte.html";
}
function get_recipe_data_from_search_link(search_url, num_results) {
    if (num_results === void 0) { num_results = 10; }
    return __awaiter(this, void 0, void 0, function () {
        var res, text, dom, doc, i, data, _i, _a, item, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, node_fetch_1.default(search_url)];
                case 1:
                    res = _b.sent();
                    return [4 /*yield*/, res.text()];
                case 2:
                    text = _b.sent();
                    return [4 /*yield*/, new jsdom_1.default.JSDOM(text)];
                case 3:
                    dom = _b.sent();
                    doc = dom.window.document;
                    i = 0;
                    data = [];
                    // TODO: optimize for 1 items with doc.querySelector('')
                    for (_i = 0, _a = doc.querySelectorAll('a.rsel-recipe.bi-recipe-item'); _i < _a.length; _i++) {
                        item = _a[_i];
                        // FIXME: null case
                        data.push(get_recipe_data(item));
                        i++;
                        if (i >= num_results)
                            break;
                    }
                    return [2 /*return*/, data];
                case 4:
                    error_1 = _b.sent();
                    console.error(error_1);
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function get_recipes(search_string, difficulty, duration_min, num_results) {
    if (difficulty === void 0) { difficulty = 3; }
    if (duration_min === void 0) { duration_min = undefined; }
    if (num_results === void 0) { num_results = 10; }
    return __awaiter(this, void 0, void 0, function () {
        var url, data, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    url = search_url_recipe(search_string, difficulty, duration_min);
                    return [4 /*yield*/, get_recipe_data_from_search_link(url, num_results)];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = get_recipes;
//# sourceMappingURL=chefkoch_scrape.js.map