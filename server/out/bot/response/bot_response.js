"use strict";
// interfaces need be implemented as classes in pure js
// interface needs to be able to analyze LUIS data
//  -> these interfaces dont fetch the LUIS data, but save it and work on it
// interface needs to be able to analyze my response data
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotResponseFactory = exports.BotResponse = void 0;
// these 2 functionalities should be implemented in a class for logic and data exchange
//  -> class extends interfaces
//  -> this class should be as much abstracted into the interfaces as possible
//  -> it would be awesome if the filter logic is also abstracted into interface classes
//  -> class needs to return one method (abstract and overridable) for the bot to fetch the response
// should this class also handle fetching the data from chefkoch or fetching images ??? -> propably yes
// data should be returned in json format
// should data formats be defined for vue app to use and abstract from ?
/*
    THE PLAN:

    Construct "interface" out of 2 components:
        1. interpreter for LUIS data
        2. response creator

    -> interface sould return response in json format

    THE QUESTION:
        How do i construct an interface that lets these components work together

*/
var information_extractors_1 = require("./information_extractors");
var response_creators_1 = require("./response_creators");
var BotResponse = /** @class */ (function () {
    function BotResponse(information_extractor, response_creator) {
        this.information_extractor = information_extractor;
        this.response_creator = response_creator;
    }
    // sets the nformationExtractor instance's input data
    BotResponse.prototype.set_input_data = function (input_data) {
        this.information_extractor.set_input_data(input_data);
    };
    BotResponse.prototype.analyze_data = function () {
        this.information_extractor.extract_data();
        this.response_creator.create_response(this.information_extractor);
    };
    BotResponse.prototype.get_response_data = function () {
        return this.response_creator.get_response_data();
    };
    return BotResponse;
}());
exports.BotResponse = BotResponse;
var BotResponseFactory = /** @class */ (function () {
    function BotResponseFactory() {
    }
    /**
     * @param {input_data} - json data object
     * @return {BotResponse}
     */
    BotResponseFactory.make_response = function (input_data) {
        if (response_creators_1.NoneResponseCreator.fits_input(input_data)) {
            return new BotResponse(new information_extractors_1.IntentExtractor(), new response_creators_1.NoneResponseCreator());
        }
        else if (response_creators_1.LunchResponseCreator.fits_input(input_data)) {
            return new BotResponse(new information_extractors_1.PhraseListExtractor(), new response_creators_1.LunchResponseCreator());
        }
        else {
            return null;
        }
    };
    return BotResponseFactory;
}());
exports.BotResponseFactory = BotResponseFactory;
//# sourceMappingURL=bot_response.js.map