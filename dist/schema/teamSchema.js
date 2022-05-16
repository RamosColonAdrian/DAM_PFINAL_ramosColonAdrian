"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teams = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    teamID: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    coach: {
        type: String,
        required: true
    },
    region: {
        type: String,
        requiered: true
    },
    playingCurrently: {
        type: Boolean,
        requiered: true,
        default: true
    },
    headquarters: {
        type: String
    },
});
exports.Teams = (0, mongoose_1.model)("teams", teamSchema);
