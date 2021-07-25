"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rand_slice = exports.rand_choice = exports.matches_schema = void 0;
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
function rand_choice(arr) {
    if (!(arr instanceof Array))
        return null;
    return arr[Math.floor(Math.random() * arr.length)];
}
exports.rand_choice = rand_choice;
function rand_slice(arr, num_el) {
    if (num_el === void 0) { num_el = 3; }
    if (!(arr instanceof Array))
        return [];
    var start = arr.length > num_el ? Math.floor(Math.random() * (arr.length - num_el)) : 0;
    var end = start + num_el > arr.length ? arr.length : start + num_el;
    return arr.slice(start, end);
}
exports.rand_slice = rand_slice;
//# sourceMappingURL=util.js.map