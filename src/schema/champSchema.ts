import { Schema, model } from "mongoose";
import { validateLength } from "../helpers/arrayHelpers"

const champSchema = new Schema({
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
    validate: [(value: any[]) => validateLength(value, 4), "Skills amount limit: 4."]
  },
});



export const Champions = model("Champions", champSchema);
