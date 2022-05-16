"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
class Team {
    constructor(name, teamID, coach, region, playingCurrently, headquarters) {
        this._players = [];
        this._name = name;
        this._teamID = teamID;
        this._coach = coach;
        this._region = region;
        this._playingCurrently = playingCurrently;
        this._headquarters = headquarters;
    }
    get expenses() {
        let expenses = 0;
        for (let j of this._players) {
            expenses += j.salary;
        }
        return expenses;
    }
    get name() {
        return this._name;
    }
    get coach() {
        return this._coach;
    }
    get region() {
        return this._region;
    }
    get playingCurrently() {
        return this._playingCurrently;
    }
    get headquarters() {
        return this._headquarters;
    }
    get players() {
        return this._players;
    }
    set players(value) {
        this._players = value;
    }
    get teamID() {
        return this._teamID;
    }
}
exports.Team = Team;
