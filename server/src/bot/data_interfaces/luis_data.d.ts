type Entities = object;

export interface ILuisData {
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
