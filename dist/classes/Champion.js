"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Champion = void 0;
class Champion {
    constructor(name, position, type) {
        this._name = name;
        this._position = position;
        this._type = type;
        this._skills = [];
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
    }
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = type;
    }
    get skills() {
        return this._skills;
    }
    set skills(skills) {
        this._skills = skills;
    }
}
exports.Champion = Champion;
