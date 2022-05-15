import { Schema, model } from "mongoose";
import { validateLength } from "../helpers/arrayHelpers"
import crypto from "crypto"

const playerSchema = new Schema({
  playerID:{
    type: String,
    unique: true,
    default: crypto.randomUUID()
  },
  name: {
    type: String,
    required: true,
  },
  nickName:{
    type: String,
    required: true
  },
  rank: {
    type: String,
    enum: [
      "iron",
      "bronze",
      "silver",
      "gold",
      "platinum",
      "diamond",
      "master",
      "challenger",
    ],
    lowercase: true,
    required: true,
  },
  salary: {
    type: Number,
    min: [1000, "The minimum interprofessional salary is €1000"],
  },
  nationality: {
    type: String,
  },
  position: {
    type: String,
    lowercase: true,
    enum: ["top", "jungler", "mid", "adc", "support"],
    required: true,
  },
  birthdate: {
    type: Date,
  },
  region: {
    type: String,
  },
  team: {
    /*type: Schema.Types.ObjectId,
    ref: "Team",*/
    type: String //fk
  },
  kills: {
    type: Number,
  },
  deaths: {
    type: Number,
  },
  assists: {
    type: Number,
  },
  championPool: {
    type: String,  //fk
    
  },
});

//hacemos una virtual en vez de un metodo propio del jugador para aprovechar el potencial de mongoose
playerSchema
  .virtual("kdaRatio")
  .get(function (this: { kills: number; assists: number; deaths: number }) {
    return (this.kills + this.assists) / this.deaths;
  });

export const Players = model("Players", playerSchema);
