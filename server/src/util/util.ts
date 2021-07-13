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
