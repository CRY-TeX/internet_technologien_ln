/**
 * compares all paths and values (except array values) from schema_obj to compare_obj
 * As long as the schema_obj is mappable to compare_obj it returns true, even if compare_obj
 * as additional data
 */
export function compare_schema(schema_obj: object, compare_obj: object): boolean {
  for (const prop in schema_obj) {
    if (!compare_obj.hasOwnProperty(prop)) return false;

    if (schema_obj[prop] instanceof Object) {
      if (!compare_schema(schema_obj[prop], compare_obj[prop])) return false;
    } else if (schema_obj[prop] !== compare_obj[prop]) return false;
  }
  return true;
}
