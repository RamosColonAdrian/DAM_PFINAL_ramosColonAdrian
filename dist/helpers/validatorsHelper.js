"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateAndVoid = exports.validateVoidAndisNan = exports.validateVoid = void 0;
function validateVoid(input) {
    if (input.length == 0) {
        return "Todos los campos son requeridos";
    }
    else {
        return true;
    }
}
exports.validateVoid = validateVoid;
function validateVoidAndisNan(input) {
    if (input.length == 0) {
        return "Todos los campos son requeridos";
    }
    else if (isNaN(+input)) {
        return "Por favor introduzca un numero valido";
    }
    else {
        return true;
    }
}
exports.validateVoidAndisNan = validateVoidAndisNan;
function validateDateAndVoid(input) {
    if (input.length == 0) {
        return "Todos los campos son requeridos";
    }
    else if (!input.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}/g)) {
        return "Por favor una fecha con formato valido";
    }
    else {
        return true;
    }
}
exports.validateDateAndVoid = validateDateAndVoid;
