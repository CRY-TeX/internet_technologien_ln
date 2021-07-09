type UrlString = string;
type ImageUrlString = UrlString;

interface IAnswerMessage {
  message: string;
  preview_url?: ImageUrlString;
}

interface IMealItem {
  name: string;
  link: UrlString; // url
  preview_url: ImageUrlString; // url to image
  cooking_time: string;
  difficulty: string;
}

export interface IResponseData {
  answer_message: IAnswerMessage;
  suggestions?: string[];
  meal_list?: IMealItem[];
}
