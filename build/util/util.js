"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.matches_schema = void 0;
/**
 * compares all paths and values (except array values) from schema_obj to compare_obj
 * As long as the schema_obj is mappable to compare_obj it returns true, even if compare_obj
 * as additional data
 */
function matches_schema(schema, obj, ignore) {
    if (ignore === void 0) { ignore = '*'; }
    for (var el in schema) {
        if (schema[el] instanceof Object) {
            if (!(obj instanceof Object))
                return false;
            if (!matches_schema(schema[el], obj[el], ignore))
                return false;
        }
        if (!(schema instanceof Array)) {
            if (!obj.hasOwnProperty(el)) {
                return false;
            }
        }
        if (schema[el] === ignore)
            return true;
        if (!(schema[el] instanceof Object) && schema[el] !== obj[el])
            return false;
    }
    return true;
}
exports.matches_schema = matches_schema;
//# sourceMappingURL=util.js.map