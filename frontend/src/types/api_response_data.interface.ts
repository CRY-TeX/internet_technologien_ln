export type UrlString = string;
export type ImageUrlString = UrlString;

export interface IAnswerMessage {
  msg: string;
  preview_url?: ImageUrlString;
}

export interface IMealItem {
  name: string;
  link: UrlString; // url
  preview_url: ImageUrlString; // url to image
  cooking_time: string;
  difficulty: string;
}

export interface IApiResponse {
  id: number;
  query: string;
  answer_message: IAnswerMessage;
  suggestions?: string[];
  meal_list?: IMealItem[];
}
