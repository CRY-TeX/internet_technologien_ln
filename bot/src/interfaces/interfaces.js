// interfaces need be implemented as classes in pure js
// interface needs to be able to analyze LUIS data
//  -> these interfaces dont fetch the LUIS data, but save it and work on it
// interface needs to be able to analyze my response data

// these 2 functionalities should be implemented in a class for logic and data exchange
//  -> class extends interfaces
//  -> this class should be as much abstracted into the interfaces as possible
//  -> it would be awesome if the filter logic is also abstracted into interface classes
//  -> class needs to return one method (abstract and overridable) for the bot to fetch the response

// should this class also handle fetching the data from chefkoch or fetching images ??? -> propably yes

// data should be returned in json format
// should data formats be defined for vue app to use and abstract from
