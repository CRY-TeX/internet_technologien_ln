export interface IIntent {
  intent: string;
  score: number;
  category?: string;
  entity?: string;
}
