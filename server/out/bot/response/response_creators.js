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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunchResponseCreator = exports.NoneResponseCreator = exports.BaseResponseCreator = void 0;
var information_extractors_1 = require("./information_extractors");
var BaseResponseCreator = /** @class */ (function () {
    function BaseResponseCreator() {
        // TODO: fix type
        this.response_data = null;
    }
    // TODO: fix object type
    BaseResponseCreator.fits_input = function (input_data) {
        return false;
    };
    BaseResponseCreator.prototype.create_response = function (information_extractor) {
        if (!this.is_compatible(information_extractor))
            throw new TypeError(information_extractors_1.BaseInformationExtractor.name + " \"" + information_extractor.constructor.name + "\" is not compatible with " + BaseResponseCreator.name + "\"");
        this.response_data = this.return_response(information_extractor);
    };
    BaseResponseCreator.prototype.get_response_data = function () {
        return this.response_data; // json_obj
    };
    return BaseResponseCreator;
}());
exports.BaseResponseCreator = BaseResponseCreator;
var NoneResponseCreator = /** @class */ (function (_super) {
    __extends(NoneResponseCreator, _super);
    function NoneResponseCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoneResponseCreator.prototype.is_compatible = function (information_extractor) {
        return information_extractor.constructor === information_extractors_1.IntentExtractor;
    };
    NoneResponseCreator.prototype.return_response = function (information_extractor) {
        // TODO: change if luis also recognizes entities in None intent
        // return this.#answers[Math.random() * this.#answers.length];
        var res = {
            answer_message: {
                message: NoneResponseCreator.ANSWERS[Math.random() * NoneResponseCreator.ANSWERS.length],
            },
        };
        return res;
    };
    // TODO: fix type
    NoneResponseCreator.fits_input = function (input_data) {
        var _a;
        return ((_a = input_data === null || input_data === void 0 ? void 0 : input_data.prediction) === null || _a === void 0 ? void 0 : _a.topIntent) === NoneResponseCreator.INTENT;
    };
    NoneResponseCreator.INTENT = 'None';
    NoneResponseCreator.ANSWERS = [
        'Entschuldigen Sie, ich habe sie nicht verstanden.',
        'Können sie das bitte nochmal wiederholen',
        'Ich konnte sie leider nicht verstehen.',
        'Wie bitte?',
    ];
    return NoneResponseCreator;
}(BaseResponseCreator));
exports.NoneResponseCreator = NoneResponseCreator;
var LunchResponseCreator = /** @class */ (function (_super) {
    __extends(LunchResponseCreator, _super);
    function LunchResponseCreator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LunchResponseCreator.prototype.is_compatible = function (information_extractor) {
        return information_extractor.constructor === information_extractors_1.PhraseListExtractor;
    };
    LunchResponseCreator.prototype.return_response = function (information_extractor) {
        // FIXME: handle what happens on null case
        var extracted_data = information_extractor.get_extracted_data();
        if (extracted_data.score < LunchResponseCreator.REQUIRED_SCORE) {
            return {
                answer_message: {
                    message: LunchResponseCreator.UNDER_SCORE_ANSWERS[Math.random() * LunchResponseCreator.UNDER_SCORE_ANSWERS.length],
                },
            };
        }
        else {
            return {
                answer_message: {
                    message: LunchResponseCreator.ANSWERS[Math.floor(Math.random() * LunchResponseCreator.ANSWERS.length)],
                },
            };
        }
    };
    LunchResponseCreator.fits_input = function (input_data) {
        var _a, _b, _c, _d, _e;
        return (((_a = input_data === null || input_data === void 0 ? void 0 : input_data.prediction) === null || _a === void 0 ? void 0 : _a.topIntent) === LunchResponseCreator.INTENT &&
            ((_e = (_d = (_c = (_b = input_data === null || input_data === void 0 ? void 0 : input_data.prediction) === null || _b === void 0 ? void 0 : _b.entities) === null || _c === void 0 ? void 0 : _c[LunchResponseCreator.DOMAIN]) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e[LunchResponseCreator.ENTITY]) !== undefined);
    };
    LunchResponseCreator.INTENT = 'want-food';
    LunchResponseCreator.DOMAIN = 'menu-type';
    LunchResponseCreator.ENTITY = 'Mittagessen';
    LunchResponseCreator.REQUIRED_SCORE = 0.8;
    LunchResponseCreator.UNDER_SCORE_ANSWERS = [
        'Ich konnte sie leider nicht genau verstehen. Wollen sie ein Mittagessen kochen?',
    ];
    LunchResponseCreator.ANSWERS = [
        'Was für eine Art von Mittagessen stellen Sie sich denn vor?',
        'Haben Sie eine bestimmte Vorstellung?',
    ];
    LunchResponseCreator.SUGGESTIONS = [];
    return LunchResponseCreator;
}(BaseResponseCreator));
exports.LunchResponseCreator = LunchResponseCreator;
//# sourceMappingURL=response_creators.js.map