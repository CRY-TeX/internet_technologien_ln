class ResponseData {
  response = {
    has_meal_list: null, // bool
    message: null, // string
    preview_url: null, // url-string
  };

  suggestions = [];

  meal_list = [];

  /**
   * @param {has_meal_list} boolean
   * @param {message} string
   * @param {preview_url} url-string
   */
  set_response_part(has_meal_list, message, preview_url) {
    this.response = {
      has_meal_list: has_meal_list, // bool
      message: message, // string
      preview_url: preview_url, // url-string
    };
  }

  /**
   * @param {suggestion} string
   */
  add_suggestion(suggestion) {
    this.suggestions.push(suggestion);
  }

  /**
   * @param {name} string
   * @param {link} url
   * @param {preview_url} url
   * @param {cooking_time} string
   * @param {difficulty} string
   */
  add_meal_list_item(name, link, preview_url, cooking_time, difficulty) {
    this.meal_list.push({
      name: name,
      link: link,
      preview_url: preview_url,
      cooking_time: cooking_time,
      difficulty: difficulty,
    });
  }

  get_json() {
    return JSON.stringify({
      response: this.response,
      suggestions: this.suggestions,
      meal_list: this.meal_list,
    });
  }
}

module.exports = { ResponseData };
