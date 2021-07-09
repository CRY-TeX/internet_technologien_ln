import fetch, { Response as FetchResponse } from 'node-fetch';
import jsdom from 'jsdom';

interface IRecipeData {
  name: string;
  page_link: string; // url
  preview_image: string; // url
  cooking_time: string;
  difficulty: string;
}

function get_recipe_data(el: any): IRecipeData | null {
  try {
    return {
      name: el?.querySelector('h2.ds-heading-link')?.name?.textContent,
      page_link: el?.link,
      preview_image: el?.querySelector('figure amp-img')?.getAttribute('src'),
      cooking_time: el
        ?.querySelector('span.recipe-preptime')
        ?.childNodes?.[1]?.nodeValue?.trim(),
      difficulty: el
        ?.querySelector('span.recipe-difficulty')
        ?.childNodes?.[1]?.nodeValue?.trim(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

function search_url_recipe(
  search_string: string,
  difficulty: number = 3,
  duration_min: number | undefined = undefined,
  categories: string[] = [] // array of category names strings
): string {
  // difficulty => 1,2,3
  const diff = Array(difficulty)
    .fill(0)
    .map((item, index) => index + 1)
    .join(',');

  return `https://www.chefkoch.de/rs/s0e1n1z1b0i1${
    duration_min ? 'd' + duration_min : ''
  }d${diff}/${search_string.toLowerCase().split(' ').join('+')}/${
    categories.length > 0 ? categories.join('-') + '-' : ''
  }Rezepte.html`;
}

async function get_recipe_data_from_search_link(
  search_url: string,
  num_results: number = 10
): Promise<any> {
  // num_results max 30, else have to handle pagination
  try {
    const res: FetchResponse = await fetch(search_url);
    const text: string = await res.text();
    const dom: jsdom.JSDOM = await new jsdom.JSDOM(text);
    const doc: Document = dom.window.document;

    let i: number = 0;
    let data: IRecipeData[] = [];
    // TODO: optimize for 1 items with doc.querySelector('')

    for (let item of doc.querySelectorAll(
      'a.rsel-recipe.bi-recipe-item'
    ) as unknown as Element[]) {
      // FIXME: null case
      data.push(get_recipe_data(item) as IRecipeData);

      i++;
      if (i >= num_results) break;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function get_recipes(
  search_string: string,
  difficulty: number = 3,
  duration_min: number | undefined = undefined,
  num_results: number = 10
) {
  try {
    const url: string = search_url_recipe(
      search_string,
      difficulty,
      duration_min
    );
    const data = await get_recipe_data_from_search_link(url, num_results);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
