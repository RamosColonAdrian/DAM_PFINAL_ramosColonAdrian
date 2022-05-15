import {Schema, model } from 'mongoose'

const teamSchema = new Schema({
    teamID:{
        type: String,
        unique: true,
    },
    name: {
        type: String,
        required:true
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
        default:true
    },
    headquarters:{
        type: String
    },
})

export const Teams = model("teams", teamSchema )

