"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(name, playerID, nickName, rank, salary, nationality, position, birthdate, region, team, kills, deaths, assists) {
        this._playerID = playerID;
        this._name = name;
        this._nickName = nickName;
        this._rank = rank;
        this._salary = salary;
        this._nationality = nationality;
        this._position = position;
        this._birthdate = birthdate;
        this._region = region;
        this._team = team;
        this._kills = kills;
        this._deaths = deaths;
        this._assists = assists;
    }
    get kda() {
        let kda = (this._kills + this._assists) / this._deaths;
        return kda;
    }
    get name() {
        return this._name;
    }
    get nickName() {
        return this._nickName;
    }
    get playerID() {
        return this._playerID;
    }
    get rank() {
        return this._rank;
    }
    get salary() {
        return this._salary;
    }
    get nationality() {
        return this._nationality;
    }
    get position() {
        return this._position;
    }
    get birthdate() {
        return this._birthdate;
    }
    get region() {
        return this._region;
    }
    get team() {
        return this._team;
    }
    get kills() {
        return this._kills;
    }
    get deaths() {
        return this._deaths;
    }
    get assists() {
        return this._assists;
    }
    get championPool() {
        return this._championPool;
    }
    set championPool(value) {
        this._championPool = value;
    }
}
exports.Player = Player;
