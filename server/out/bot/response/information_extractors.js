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
exports.PhraseListExtractor = exports.IntentExtractor = exports.BaseInformationExtractor = void 0;
var BaseInformationExtractor = /** @class */ (function () {
    function BaseInformationExtractor() {
        // FIXME: any type
        this.input_data = null;
        this.extracted_data = null;
    }
    BaseInformationExtractor.prototype.set_input_data = function (input_data) {
        this.input_data = input_data;
    };
    BaseInformationExtractor.prototype.get_input_data = function () {
        return this.input_data;
    };
    BaseInformationExtractor.prototype.get_extracted_data = function () {
        return this.extracted_data;
    };
    BaseInformationExtractor.prototype.get_top_intent = function () {
        var _a, _b;
        return this.input_data === null
            ? null
            : (_b = (_a = this.input_data) === null || _a === void 0 ? void 0 : _a.prediction) === null || _b === void 0 ? void 0 : _b.topIntent;
    };
    BaseInformationExtractor.prototype.get_top_intent_score = function () {
        return this.input_data === null
            ? null
            : this.input_data.prediction.intents[this.input_data.prediction.topIntent]
                .score;
    };
    return BaseInformationExtractor;
}());
exports.BaseInformationExtractor = BaseInformationExtractor;
var IntentExtractor = /** @class */ (function (_super) {
    __extends(IntentExtractor, _super);
    function IntentExtractor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IntentExtractor.prototype.extract_data = function () {
        try {
            if (this.input_data.prediction.topIntent === undefined)
                throw new TypeError('topIntent is undefined');
            // FIXME: handle null case
            this.extracted_data = {
                intent: _super.prototype.get_top_intent.call(this),
                score: _super.prototype.get_top_intent_score.call(this),
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    return IntentExtractor;
}(BaseInformationExtractor));
exports.IntentExtractor = IntentExtractor;
var PhraseListExtractor = /** @class */ (function (_super) {
    __extends(PhraseListExtractor, _super);
    function PhraseListExtractor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhraseListExtractor.prototype.extract_data = function () {
        try {
            if (this.input_data.prediction.topIntent === undefined)
                throw new TypeError('topIntent is undefined');
            var category = Object.keys(this.input_data.prediction.entities)[0];
            var entity = Object.keys(this.input_data.prediction.entities[category])[0];
            // FIXME: handle null case
            this.extracted_data = {
                intent: _super.prototype.get_top_intent.call(this),
                score: _super.prototype.get_top_intent_score.call(this),
                category: category,
                entity: entity,
            };
        }
        catch (error) {
            throw new Error(error.message);
        }
    };
    return PhraseListExtractor;
}(BaseInformationExtractor));
exports.PhraseListExtractor = PhraseListExtractor;
//# sourceMappingURL=information_extractors.js.map