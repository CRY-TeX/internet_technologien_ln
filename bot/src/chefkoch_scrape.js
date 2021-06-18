const fetch = require('node-fetch');
const jsdom = require('jsdom');

function format_html_data(data) {
  try {
    new_obj = { ...data };

    new_obj.name = data.name ? data.name.textContent : null;
    new_obj.preview_image = data.preview_image
      ? data.preview_image.getAttribute('src')
      : null;
    new_obj.cooking_time = data.cooking_time
      ? data.cooking_time.childNodes[1].nodeValue.trim()
      : null;
    new_obj.difficulty = data.recipe_difficulty
      ? data.difficulty.childNodes[1].nodeValue.trim()
      : null;
    new_obj.link = data.link ? data.link.href : null;

    return new_obj;
  } catch (error) {
    console.error(error);
    return null;
  }
}

function search_url_recipe(
  search_string,
  difficulty = 3,
  duration_min = undefined,
  categories = [] // array of category names strings
) {
  // difficulty => 1,2,3
  const diff = Array(difficulty)
    .fill()
    .map((item, index) => index + 1)
    .join(',');

  return `https://www.chefkoch.de/rs/s0e1n1z1b0i1${
    duration_min ? 'd' + duration_min : ''
  }d${diff}/${search_string.toLowerCase().split(' ').join('+')}/${
    categories.length > 0 ? categories.join('-') + '-' : ''
  }Rezepte.html`;
}

async function get_recipe_data_from_search_link(search_url, num_results = 10) {
  // num_results max 30, else have to handle pagination
  try {
    const res = await fetch(search_url);
    const text = await res.text();
    const dom = await new jsdom.JSDOM(text);
    const doc = dom.window.document;

    let i = 0;
    let data = [];
    // TODO: optimize for 1 items with doc.querySelector('')
    for (let item of doc.querySelectorAll('a.rsel-recipe.bi-recipe-item')) {
      data.push(
        format_html_data({
          name: item.querySelector('h2.ds-heading-link'),
          preview_image: item.querySelector('figure amp-img'),
          cooking_time: item.querySelector('span.recipe-preptime'),
          difficulty: item.querySelector('span.recipe-difficulty'),
          link: item,
        })
      );

      i++;
      if (i >= num_results) break;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function get_recipes(
  search_string,
  difficulty = 3,
  duration_min = undefined,
  num_results = 10
) {
  try {
    const url = search_url_recipe(search_string, difficulty, duration_min);
    const data = await get_recipe_data_from_search_link(url, num_results);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  get_recipes: get_recipes,
};
