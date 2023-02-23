"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonify = void 0;
const buffer_1 = require("buffer");
function jsonify(value) {
    return JSON.stringify(value, replacer);
}
exports.jsonify = jsonify;
function replacer(key, value) {
    if (value instanceof Map) {
        const tuples = [];
        for (const [k, v] of value) {
            tuples.push([k, replacer(k, v)]);
        }
        return tuples;
    }
    if (value instanceof ArrayBuffer) {
        return buffer_1.Buffer.from(value).toString('base64url');
    }
    return value;
}
