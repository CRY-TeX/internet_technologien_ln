/**
 * WHICH SCRAPERS DO I NEED?
 *
 * - normal recipe searches
 * - random recipes
 * - suggestion of the day
 */
import fetch, { Response as FetchResponse } from 'node-fetch';
import jsdom from 'jsdom';

import { IMealItem } from '../types/api_response_data.interface';

export enum MeatPref {
  NO_PREF = '',
  VEGAN = 'vegan',
  VEGETARIAN = 'vegetarisch',
}

function recipe_ok(obj: IMealItem): boolean {
  for (const prop in obj) {
    if ((obj as any)[prop] === null || (obj as any)[prop] === undefined) return false;
  }

  return true;
}

export async function recipe_of_the_day(meat_pref: MeatPref): Promise<IMealItem | null> {
  try {
    const url: string = `https://www.chefkoch.de/rezept-des-tages/${meat_pref}`;
    const res: FetchResponse = await fetch(url);
    const dom: jsdom.JSDOM = await new jsdom.JSDOM(await res.text());
    const doc = dom.window.document;

    const recipe: IMealItem = {
      name: (
        doc.querySelector(
          '#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > a > h3'
        ) as HTMLHeadingElement
      ).textContent as string,
      link: (
        doc.querySelector(
          '#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > a'
        ) as HTMLLinkElement
      ).href,
      preview_url: (
        doc.querySelector(
          '#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__picture > a > img'
        ) as HTMLImageElement
      ).src,
      cooking_time: (
        (
          doc.querySelector(
            '#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > aside > span.meta--clock'
          ) as HTMLSpanElement
        ).textContent as string
      ).trim(),
      difficulty: (
        (
          doc.querySelector(
            '#page-wrapper > div.content-wrapper > div > div.flex-row.two-columns > div.card.card-recipe.recipe--today > div.card__main > aside > span.meta--badge'
          ) as HTMLSpanElement
        ).textContent as string
      ).trim(),
    };

    if (!recipe_ok(recipe)) throw new Error('Could not scrape all data');

    return recipe;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function random_recipe(): Promise<IMealItem | null> {
  try {
    const url: string = 'https://www.chefkoch.de/rezepte/was-koche-ich-heute/';
    const res: FetchResponse = await fetch(url);
    const doc: Document = (await new jsdom.JSDOM(await res.text())).window.document;

    const recipe = {
      name: (
        doc.querySelector(
          '#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > span'
        ) as HTMLSpanElement
      ).textContent as string,
      link: (
        doc.querySelector(
          '#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a'
        ) as HTMLLinkElement
      ).href,
      preview_url: (
        doc.querySelector(
          '#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > img'
        ) as HTMLImageElement
      ).src,
      cooking_time: (
        (
          doc.querySelector(
            '#page-wrapper > div.inspiration-container > div.inspiration > div:nth-child(1) > div > a > div > span'
          ) as HTMLSpanElement
        ).textContent as string
      ).trim(),
      difficulty: '', // TODO: fix difficulty
    };

    if (!recipe_ok(recipe)) throw new Error('Could not scrape all data of recipe');

    return recipe;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export interface Category {
  id: string;
  html_file: string;
}

export enum Difficulty {
  EASY = 'd1',
  AND_MEDIUM = 'd1,2',
  AND_HARD = 'd1,2,3',
}

export enum Duration {
  ALL = '',
  D15 = 'm15',
  D30 = 'm30',
  D60 = 'm60',
  D120 = 'm120',
}

export function build_search_url(
  search_name: string,
  difficulty: Difficulty = Difficulty.AND_HARD,
  duration: Duration = Duration.ALL,
  category: Category = { id: 's0', html_file: 'Rezepte.html' }
): string {
  return `https://www.chefkoch.de/rs/${category.id}e1n1z1b0i1${duration}${difficulty}/${search_name
    .trim()
    .replace(' ', '+')}/${category.html_file}`;
}

function get_recipe_data(el: HTMLElement): IMealItem | null {
  try {
    return {
      name: (el.querySelector('h2.ds-heading-link') as HTMLHeadingElement).textContent as string,
      link: (el as HTMLLinkElement).href,
      preview_url: el.querySelector('figure amp-img')?.getAttribute('src') as string,
      cooking_time: (
        (el?.querySelector('span.recipe-preptime')?.childNodes?.[1] as HTMLSpanElement)?.nodeValue as string
      )?.trim(),
      difficulty: (
        (el?.querySelector('span.recipe-difficulty')?.childNodes?.[1] as HTMLSpanElement)?.nodeValue as string
      )?.trim(),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function query_recipes(url: string): Promise<IMealItem[] | null> {
  try {
    const doc: Document = (await new jsdom.JSDOM(await (await fetch(url)).text())).window.document;
    const meals: IMealItem[] = [];

    for (const el of doc.querySelectorAll('a.rsel-recipe.bi-recipe-item') as unknown as Element[]) {
      const recipe = get_recipe_data(el as HTMLElement);

      // TODO: print out waring or smth
      if (recipe === null) {
        console.warn('recipe is null');
        continue;
      }
      if (!recipe_ok(recipe)) {
        console.warn('recipe has null value');
        continue;
      }

      meals.push(recipe);
    }

    return meals;
  } catch (error) {
    console.error(error);
    return null;
  }
}
