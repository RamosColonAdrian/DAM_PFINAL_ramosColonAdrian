import { Champion } from "./Champion";
import crypto from "crypto";

export class Player {

  private _playerID: string;

  private _name: string;

  private _rank: string;

  private _salary: number;

  private _nationality: string;

  private _position: string;

  private _birthdate: Date;

  private _region: string;

  private _team: string; //FK

  private _kills: number;

  private _deaths: number;

  private _assists: number;

  private "_championPool": Champion

  private _nickName: string;

  public constructor(
    name: string,
    playerID: string,
    nickName : string,
    rank: string,
    salary: number,
    nationality: string,
    position: string,
    birthdate: Date,
    region: string,
    team: string,
    kills: number,
    deaths: number,
    assists: number
  ) {
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

  public get kda(): number {
    let kda = (this._kills + this._assists) / this._deaths;
    return kda
  }

  public get name(): string {
    return this._name;
  }

  public get nickName(): string {
    return this._nickName;
  }

  public get playerID(): string {
    return this._playerID;
  }

  public get rank(): string {
    return this._rank;
  }

  public get salary(): number {
    return this._salary;
  }

  public get nationality(): string {
    return this._nationality;
  }

  public get position(): string {
    return this._position;
  }

  public get birthdate(): Date {
    return this._birthdate;
  }

  public get region(): string {
    return this._region;
  }

  public get team(): string {
    return this._team;
  }

  public get kills(): number {
    return this._kills;
  }

  public get deaths(): number {
    return this._deaths;
  }

  public get assists(): number {
    return this._assists;
  }

  public get championPool(): Champion {
    return this._championPool;
  }

  public set championPool(value: Champion) {
    this._championPool = value;
  }
}
