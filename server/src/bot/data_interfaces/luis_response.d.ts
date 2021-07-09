type Entities = object;

export interface ILuisResponse {
  query: string;
  prediction: IPrediction;
}

export interface IPrediction {
  topIntent: string;
  intents: {
    intent: IIntent;
  };
  entities?: Entities;
}

interface IIntent {
  name: {
    score: number;
  };
}
