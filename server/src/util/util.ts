/**
 * compares all paths and values (except array values) from schema_obj to compare_obj
 * As long as the schema_obj is mappable to compare_obj it returns true, even if compare_obj
 * as additional data
 */
export function matches_schema(schema: any, obj: any, ignore: string = '*'): boolean {
  for (const el in schema) {
    if (schema[el] instanceof Object) {
      if (!(obj instanceof Object)) return false;
      if (!matches_schema(schema[el], obj[el], ignore)) return false;
    }

    if (!(schema instanceof Array)) {
      if (!obj.hasOwnProperty(el)) {
        return false;
      }
    }

    if (schema[el] === ignore) return true;

    if (!(schema[el] instanceof Object) && schema[el] !== obj[el]) return false;
  }
  return true;
}

export function rand_choice(arr: any[]): any | null {
  if (!(arr instanceof Array)) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function rand_slice(arr: any[], num_el: number = 3): any[] {
  if (!(arr instanceof Array)) return [];

  const start = arr.length > num_el ? Math.floor(Math.random() * (arr.length - num_el)) : 0;
  const end = start + num_el > arr.length ? arr.length : start + num_el;
  return arr.slice(start, end);
}
