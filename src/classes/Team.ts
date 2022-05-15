import { Player } from './Player'
import crypto from "crypto"

export class Team {
  private _teamID :string

  private _name: string

  private _coach: string

  private _region: string

  private _playingCurrently: boolean

  private _headquarters: string

  private _players: Player[]
	

  public constructor (
    name: string,
    teamID:string,
    coach: string,
    region: string,
    playingCurrently: boolean,
    headquarters: string,

  ) {
	  this._players = []
    this._name = name
    this._teamID = teamID
    this._coach = coach
    this._region = region
    this._playingCurrently = playingCurrently
    this._headquarters = headquarters

  }

  public get expenses() {
    let expenses: number = 0
    for (let j of this._players) {
      expenses += j.salary
    }
    return expenses
  }

  public get name (): string {
    return this._name
  }

  public get coach (): string {
    return this._coach
  }

  public get region (): string {
    return this._region
  }

  public get playingCurrently (): boolean {
    return this._playingCurrently
  }

  public get headquarters (): string {
    return this._headquarters
  }

  public get players (): Array<Player> {
    return this._players
  }

  public set players(value: Array<Player>) {
	this._players = value
  }

  public get teamID (): string {
    return this._teamID
  }
}
