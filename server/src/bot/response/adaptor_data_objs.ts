export interface SimpleIntent {
  intent: string;
  score: number;
}

export interface PhraseListData extends SimpleIntent {
  category: string;
  entity: string;
}
