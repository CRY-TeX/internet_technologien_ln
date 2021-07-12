type Entities = object;

export interface ILuisData {
  query?: string;
  prediction: IPrediction;
}

export interface IPrediction {
  topIntent: string;
  entities?: Entities;
}
