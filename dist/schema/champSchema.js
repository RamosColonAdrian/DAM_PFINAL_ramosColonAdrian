"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Champions = void 0;
const mongoose_1 = require("mongoose");
const arrayHelpers_1 = require("../helpers/arrayHelpers");
const champSchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    position: {
        type: String,
        enum: ["top", "jungler", "mid", "adc", "support"],
        required: true
    },
    type: {
        type: String,
        enum: ["assassin", "fighter", "mage", "marksman", "tank", "healer"],
    },
    skills: {
        type: [
            {
                name: {
                    type: String,
                    required: true,
                },
                manaCost: {
                    type: Number,
                    required: false,
                },
                description: {
                    type: String,
                    required: true,
                }
            }
        ],
        validate: [(value) => (0, arrayHelpers_1.validateLength)(value, 4), "Skills amount limit: 4."]
    },
});
exports.Champions = (0, mongoose_1.model)("Champions", champSchema);
