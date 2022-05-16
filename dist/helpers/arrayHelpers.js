"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLength = void 0;
const validateLength = (arr, limit) => {
    return Boolean(arr.length <= limit);
};
exports.validateLength = validateLength;
