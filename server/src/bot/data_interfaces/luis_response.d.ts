type Intents = object;
type Entities = object;

export interface ILuisResponseData {
  query: string;
  prediction: IPrediction;
}

export interface IPrediction {
  topIntent: string;
  intents: Intents;
  entities: Entities;
}
