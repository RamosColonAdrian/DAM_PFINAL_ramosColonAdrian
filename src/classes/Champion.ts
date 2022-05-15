type SkillInterface = {
  name: string;
  manaCost: number;
  description: string;
};

export class Champion {
  private _name: string;
  private _position: string;
  private _type: string;
  private _skills: SkillInterface[];

  constructor(
    name: string,
    position: string,
    type: string,
  ) {
    this._name = name;
    this._position = position;
    this._type = type;
    this._skills = [];
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  public get position(): string {
    return this._position;
  }

  public set position(position: string) {
    this._position = position;
  }

  public get type(): string {
    return this._type;
  }

  public set type(type: string) {
    this._type = type;
  }

  public get skills(): SkillInterface[] {
    return this._skills;
  }

  public set skills(skills: SkillInterface[]) {
    this._skills = skills;
  }
}
